import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request:NextRequest, { params }): Promise<NextResponse> {

    // @ts-ignore
    const userSession = await getServerSession(authOptions);

    if(!userSession)
    {
        return new NextResponse("Unauthorized.", { status: 401 });
    }

    const userId = params.id ;
    
    const user = await prisma.user.findUnique({
        where: {
           id: userId 
        },
        include: { cartItems: true },
    })
    
    return NextResponse.json(user);
}