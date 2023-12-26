import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export const POST = async (request:NextRequest): Promise<NextResponse> => {
    // @ts-ignore
    const userSession = await getServerSession(authOptions);

    if(!userSession)
    {
        return new NextResponse("Unauthorized.", { status: 401 });
    }

    const body = await request.json();
    const { Id, productId } = body;
    const userId = Id;
    try {
        // First, fetch the user to get their current cart items.
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { cartItems: true },
        });
  
        if (!user) {
          return new NextResponse("User not found.", { status: 404 });
        }
  
        // Check if the product is already in the user's cart.
        const isProductInCart = user.cartItems.some((product) => product.id === productId);
  
        if (isProductInCart) {
            return new NextResponse("Product is already in the cart.", { status: 400 });
        }
  
        // Fetch the product based on the provided productId.
        const product = await prisma.product.findUnique({ where: { id: productId } });
  
        if (!product) {
            return new NextResponse("Product not found.", { status: 404 });
        }
  
        // Add the product to the user's cartItems using the connect operation.
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            cartItems: {
              connect: [{ id: productId }],
            },
          },
          include: { cartItems: true },
        });

        return NextResponse.json(updatedUser);

      } catch (error) {
        console.log(error);
        
        return new NextResponse("An error occured.", { status: 500 });
      }
}
