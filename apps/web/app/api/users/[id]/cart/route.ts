import { prisma } from "database";
import { NextResponse } from "next/server";

export async function GET(request:Request, { params }){
    const userId = params.id ;
    
    const user = await prisma.user.findUnique({
        where: {
           id: userId 
        },
        include: { cartItems: true },
    })
    
    return NextResponse.json(user);
}