import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
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

    // Handle BigInt serialization
    const serializedPromos = promotions.map(promo => ({
      ...promo,
      id: promo.id.toString()
    }));

    return NextResponse.json({ data: serializedPromos });
  } catch (error) {
    console.error("Failed to fetch promotions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
