import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const POST = async (req: NextRequest, { params }): Promise<NextResponse> => {

  // @ts-ignore
  const userSession = await getServerSession(authOptions);

  if(!userSession)
  {
      return new NextResponse("Unauthorized.", { status: 401 });
  }

  const userId = params.id;

  try {
    // Update the user's cartItems to an empty array to empty the cart.
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        cartItems: { set: [] },
      },
    });

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error("Error emptying cart: ", error);
    return new NextResponse("An error occurred.", { status: 500 });
  }
};