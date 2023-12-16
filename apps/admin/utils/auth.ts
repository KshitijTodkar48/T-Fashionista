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
            async authorize(credentials) {
            // Logic to look up the admin from the credentials supplied.
              if(!credentials?.email || !credentials.password)
              {
                throw new Error("Credentials not found.") ;
              }

              // Check if admin with this email exists.
              const admin = await prisma.admin.findUnique({
                where: {
                  email: credentials.email
                }
              })

              // If admin does not exist.
              if(!admin) {
                throw new Error("admin does not exist.") ;
              }

              // If admin exists, match the passwords.
              const passwordsMatch = await bcrypt.compare(credentials.password , admin.hashedPassword);

              if(!passwordsMatch)
              { 
                // Passwords do not match.
                throw new Error("Incorrect password.") ;
              }

              // return the admin object if everything is valid.
              return admin;
            }
          })
    ],
    session : {
        strategy: "jwt"
    },
    callbacks: {
      async session({ session }) {
        const sessionAdmin = await prisma.admin.findUnique({
          where: {
            email: session.user.email
          }
      })
      session.user.id = sessionAdmin?.id.toString() ;
      return session ;
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
};