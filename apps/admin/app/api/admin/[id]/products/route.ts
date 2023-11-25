import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest, { params }) => {
    const adminId = params.id;
    
    const admin = await prisma.admin.findUnique({
        where: {
            id: adminId
        },
        include: { publishedItems: true },
    })

    return NextResponse.json(admin);
}