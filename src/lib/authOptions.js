import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
      async authorize(credentials, req) {
        const result = await loginUser(credentials);
        console.log("LOGIN RESULT", result);

        if (!result.success) {
          return null;
        }

        return result;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
