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

export const PATCH = async(req: NextRequest, { params }) => {
    const productId = parseInt(params.id);
    const body = await req.json();
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

        const updatedProduct = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                title: body.title,
                description: body.description,
                price: body.price,
                imageURL: body.imageURL,
                published: body.published,
            },
        });

        return NextResponse.json(updatedProduct);

    } catch (error) {

        return new NextResponse("An error occured.", { status: 500 });

    }
}