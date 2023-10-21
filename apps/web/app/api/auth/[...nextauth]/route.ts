import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "database";
import bcrypt from "bcrypt";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
              password: { label: "Password", type: "password" }
            },
            
            // @ts-ignore
            async authorize(credentials, req) {
            // Logic to look up the user from the credentials supplied.
              if(!credentials?.email || !credentials.password)
              {
                return null ;
              }

              // Check if user with this email exists.
              const user = await prisma.user.findUnique({
                where: {
                  email: credentials.email
                }
              })

              // If user does not exist.
              if(!user) {
                return null ;
              }

              // If user exists, match the passwords.
              const passwordsMatch = await bcrypt.compare(credentials.password , user.hashedPassword);

              if(!passwordsMatch)
              { 
                // Passwords do not match.
                return null ;
              }

              // return the user object if everything is valid.
              return user;
            }
          })
    ],
    session : {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};

//@ts-ignore
const handler = NextAuth(authOptions) ;

export { handler as GET , handler as POST }