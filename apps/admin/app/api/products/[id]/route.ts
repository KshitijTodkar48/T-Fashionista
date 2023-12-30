import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { productDetailsSchema } from "zod-schemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async(req: NextRequest , { params }): Promise<NextResponse> => {
    // @ts-ignore
    const adminSession = await getServerSession(authOptions);

    if(!adminSession)
    {
        return new NextResponse("Unauthorized.", { status: 401 });
    }
    
    const productId = parseInt(params.id);
    try { 
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                orderedBy: true
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
    // @ts-ignore
    const adminSession = await getServerSession(authOptions);

    if(!adminSession)
    {
        return new NextResponse("Unauthorized.", { status: 401 });
    }

    try {
        const productId = parseInt(params.id);
        const body = await req.json();
        
        // Zod input-validation
        const validatedData = productDetailsSchema.safeParse(body);
        if(!validatedData.success)
        {
            return new NextResponse("Invalid data format" , { status: 400 });;
        }

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