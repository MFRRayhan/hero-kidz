import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "your@mail.com",
        },
      },
      async authorize(credentials, req) {
        return null;
      },
    }),
  ],
};
