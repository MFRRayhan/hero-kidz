import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: {
        //   label: "Password",
        //   type: "password",
        //   placeholder: "*********",
        // },
        // email: {
        //   label: "Email",
        //   type: "email",
        //   placeholder: "your@mail.com",
        // },
      },
      // async authorize(credentials, req) {
      //   const result = await loginUser(credentials);
      //   console.log("LOGIN RESULT", result);

      //   if (!result.success) {
      //     return null;
      //   }

      //   return result;
      // },

      async authorize(credentials, req) {
        console.log("CREDENTIALS:", credentials);
        const result = await loginUser(credentials);
        console.log("LOGIN RESULT", result);
        return result;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SIGN IN:", { user, account, profile, email, credentials });

      const userExists = await connect("users").findOne({
        email: user?.email,
        provider: account?.provider,
      });

      if (userExists) return true;

      const newUser = {
        name: user?.name,
        email: user?.email,
        image: user?.image,
        provider: account?.provider,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      const result = await connect("users").insertOne(newUser);

      return result.acknowledged;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    // async session({ session, token, user }) {
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};
