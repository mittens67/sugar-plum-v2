import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q");

  if (!search || search.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const products = await prisma.products.findMany({
    where: {
      item_name: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      item_name: true,
    },
    take: 5,
    orderBy: {
        item_name: 'asc'
    }
  });

  const suggestions = products.map((p) => p.item_name).filter(Boolean);
  
  return NextResponse.json({ suggestions });
}
