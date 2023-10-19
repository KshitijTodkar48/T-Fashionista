import bcrypt from "bcrypt";
import { prisma } from "database";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const body = await request.json() ;
    const { email , password } = body ;
    console.log(body) ;
}