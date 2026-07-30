import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Edge Runtime Tradeoff Analysis:
// This route queries Supabase, which requires persistent connections.
// Edge Runtime (Cloudflare/Vercel Edge Functions) has connection limitations.
// Verdict: Keep on Node.js for reliability.
//
// Good Edge Runtime candidates:
// - Lightweight routes with no DB queries
// - Request routing/filtering
// - Simple string transformations
// - Static content delivery
//
// To opt-in: export const runtime = "edge";

export async function GET() {
  try {
    const supabase = await createClient();

    // Simple, lightweight query that touches your DB
    const { error } = await supabase.from("products").select("id").limit(1);

    if (error) {
      console.error("Keep-alive failed:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log("✅ Supabase keep-alive successful");
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Keep-alive unexpected error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
