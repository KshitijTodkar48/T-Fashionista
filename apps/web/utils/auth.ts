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
            
            async authorize(credentials) {
            // Logic to look up the user from the credentials supplied.
              if(!credentials?.email || !credentials.password)
              {
                throw new Error("Credentials not found.") ;
              }

              // Check if user with this email exists.
              const user = await prisma.user.findUnique({
                where: {
                  email: credentials.email
                }
              })

              // If user does not exist.
              if(!user) {
                throw new Error("User does not exist.") ;
              }

              // If user exists, match the passwords.
              const passwordsMatch = await bcrypt.compare(credentials.password , user.hashedPassword);

              if(!passwordsMatch)
              { 
                // Passwords do not match.
                throw new Error("Incorrect password.") ;
              }

              // return the user object if everything is valid.
              return user;
            }
          })
    ],
    session : {
        strategy: "jwt"
    },
    callbacks: {
      async session({ session }) {
        const sessionUser = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
      })
      session.user.id = sessionUser?.id.toString() ;
      return session ;
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};