import bcrypt from "bcrypt";
import { prisma } from "database";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const body = await request.json() ;
    const { email , password } = body ;
    console.log(body) ;

    if(!email || !password)
    {
        return new NextResponse("Missing email or password" , { status: 400 });
    }

    const exists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(exists)
    {
        return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword:string = await bcrypt.hash(password,10) ;

    const newUser = await prisma.user.create({
        data : {
            email,
            hashedPassword
        }
    })

    return NextResponse.json(newUser) ;
}