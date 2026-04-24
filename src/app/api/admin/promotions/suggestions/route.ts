import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q");

  if (!search || search.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const promos = await prisma.promotions.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      title: true,
    },
    take: 5,
    orderBy: {
        title: 'asc'
    }
  });

  const suggestions = promos.map((p) => p.title).filter(Boolean);
  
  return NextResponse.json({ suggestions });
}
