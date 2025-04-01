import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "EmailCredentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email", },
        password: { label: "Password", type: "password" },

      },
      async authorize(credentials) {
        const res = await axios.get(`https://quiz-mania-iota.vercel.app/signin/${credentials.email}`);
        const user = res.data.userInfo
        console.log(res.data.userInfo, "res from auth.js")
        console.log(user, "user from auth.js")
        if (user) {
          return {
            id: user._id,               
            name: user.username,        
            email: user.email,          
            image: user.picture,        
            role: user.role
          }
        } else {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    }
  }
});
