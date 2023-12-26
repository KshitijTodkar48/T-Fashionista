/* eslint-disable import/no-extraneous-dependencies */
import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export const POST = async(request:NextRequest) => {

    // @ts-ignore
    const userSession = await getServerSession(authOptions);

    if(!userSession)
    {
        return new NextResponse("Unauthorized.", { status: 401 });
    }
    
    const body = await request.json();
    const { userId, productId } = body;
    try{
        // First, fetch the user to get their current cart items.
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { cartItems: true },
        });

        if(!user)
        {
            return new NextResponse("User not found.", {status: 404});
        }

        // Check if the product is in the user's cart.
        const isProductInCart = user.cartItems.some((product) => product.id === productId);

        if (!isProductInCart) {
            return new NextResponse("Product is not in the cart.", { status: 400 });
        }

        // Remove the product from the user's cartItems using the disconnect operation.
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                cartItems: {
                    disconnect: [{ id: productId }],
                },
            },
            include: { cartItems: true },
        });

        return NextResponse.json(updatedUser);

    } catch(error) {
        return new NextResponse("An error occurred.", { status: 500 });
    }
}