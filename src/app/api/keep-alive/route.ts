import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Simple, lightweight query that touches your DB
    const { error } = await supabase.from("products").select("id").limit(1);

    if (error) {
      console.error("Keep-alive failed:", error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log("✅ Supabase keep-alive successful");
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Keep-alive unexpected error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
