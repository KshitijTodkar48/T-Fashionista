import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest , { params }) => {
    const productId = parseInt(params.id);
    try { 
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        
        if(!product)
        {
            return new NextResponse("Product not found.", { status: 404 });
        }

        return NextResponse.json(product);

    } catch (error) {

        return new NextResponse("An error occured.", { status: 500 });

    }
    
}