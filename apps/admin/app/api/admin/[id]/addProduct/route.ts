import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { productDetailsSchema } from "zod-schemas";

export const POST = async(req: NextRequest, { params }) =>
{
    try {
        const adminId = params.id;
        const body = await req.json();

        // Zod input-validation
        const validatedData = productDetailsSchema.safeParse(body);
        if(!validatedData.success)
        {
            return new NextResponse("Invalid data format" , { status: 400 });;
        }

        const { title, description, imageURL, price, published } = validatedData.data ;

        if(!adminId)
        {
            return new NextResponse("Unauthorized." , { status: 401 });
        }

        const admin = await prisma.admin.findUnique({
            where: {
                id: adminId
            }
        })

        if(!admin)
        {
            return new NextResponse("Unauthorized." , { status: 401 });
        }

        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                imageURL,
                price,
                published,
                publishedBy: {
                    connect: { id: admin.id },
                  },
            }
        })
        
        return NextResponse.json(newProduct) ;

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}