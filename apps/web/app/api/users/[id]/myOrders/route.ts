import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request:NextRequest, { params }){
    const userId = params.id ;
    
    const user = await prisma.user.findUnique({
        where: {
           id: userId 
        },
        include: { orderedItems: true },
    })
    
    return NextResponse.json(user);
}