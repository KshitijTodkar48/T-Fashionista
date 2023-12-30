import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export const POST = async(req: NextRequest, { params }): Promise<NextResponse> => {

    // @ts-ignore
    const userSession = await getServerSession(authOptions);

    if(!userSession)
    {
        return new NextResponse("Unauthorized.", { status: 401 });
    }

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
        return new NextResponse("An error occurred.", { status: 500 });
      }
}