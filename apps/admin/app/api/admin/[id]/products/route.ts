import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export const GET = async(request: NextRequest, { params }) => {
    // @ts-ignore
    const adminSession = await getServerSession(authOptions);

    if(!adminSession)
    {
        return new NextResponse("Unauthorized.", { status: 401 });
    }
    
    const adminId = params.id;
    
    const admin = await prisma.admin.findUnique({
        where: {
            id: adminId
        },
        include: { publishedItems: true },
    })

    return NextResponse.json(admin);
}