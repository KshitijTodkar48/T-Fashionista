import bcrypt from "bcrypt";
import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { signupFormSchema } from "zod-schemas";

export async function POST(request:NextRequest): Promise<NextResponse>
{
    const body = await request.json() ;

    // Zod input-validation
    const validatedData = signupFormSchema.safeParse(body);
    if(!validatedData.success)
    {
        return new NextResponse("Invalid data format" , { status: 400 });;
    }

    const { name, email, password } = validatedData.data ;

    if(!email || !password)
    {
        return new NextResponse("Missing email or password" , { status: 400 });
    }

    const exists = await prisma.admin.findUnique({
        where: {
            email: email
        }
    });

    if(exists)
    {
        return new NextResponse("Admin already exists", { status: 400 });
    }

    const hashedPassword:string = await bcrypt.hash(password,10) ;

    const newAdmin = await prisma.admin.create({
        data : {
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(newAdmin) ;
}