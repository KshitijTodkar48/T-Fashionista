import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, { params }){
    const userId = params.id ;
    
    const user = await prisma.user.findUnique({
        where: {
           id: userId 
        },
        include: { cartItems: true },
    })
    
    return NextResponse.json(user);
}