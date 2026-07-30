import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getCachedPromotions = unstable_cache(
  async () => {
    const now = new Date();

    const promotions = await prisma.promotions.findMany({
      where: {
        is_active: true,
        deleted_at: null,
        AND: [
          {
            OR: [
              { start_date: null },
              { start_date: { lte: now } }
            ]
          },
          {
            OR: [
              { end_date: null },
              { end_date: { gte: now } }
            ]
          }
        ]
      },
      orderBy: [
        { priority: 'desc' },
        { created_at: 'desc' }
      ]
    });

    return promotions.map(promo => ({
      ...promo,
      id: promo.id.toString()
    }));
  },
  ["promotions"],
  { revalidate: 3600, tags: ["promotions"] }
);

export async function GET() {
  try {
    const data = await getCachedPromotions();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Failed to fetch promotions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
