import { prisma } from "database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}