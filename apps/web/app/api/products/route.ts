import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany({
    where: {
      published: true
    }
  });
  return NextResponse.json(products);
}