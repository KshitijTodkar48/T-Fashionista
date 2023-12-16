import { prisma } from "database";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      published: true
    }
  });
  return NextResponse.json(products);
}