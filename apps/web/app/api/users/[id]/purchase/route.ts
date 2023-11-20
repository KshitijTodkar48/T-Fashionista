import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest, { params }) => {
    const userId = params.id;
    const body = await req.json();
    const orderedItemsIds = body.cartItemsIds; // Array of ID's of ordered products.

    try {
        // Add the products to the user's orderedItems using the connect operation.
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            orderedItems: {
              connect: orderedItemsIds.map((productId:number) => ({ id: productId })),
            },
          },
        });
    
        return NextResponse.json(updatedUser);

      } catch (error) {
        console.log("Error placing order: ", error);
        return new NextResponse("An error occurred.", { status: 500 });
      }
}