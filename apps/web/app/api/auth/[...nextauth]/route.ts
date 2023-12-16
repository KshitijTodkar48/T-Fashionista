import NextAuth from "next-auth/next";
import { authOptions } from "@/utils/auth"

//@ts-ignore
const handler = NextAuth(authOptions) ;

export { handler as GET , handler as POST }