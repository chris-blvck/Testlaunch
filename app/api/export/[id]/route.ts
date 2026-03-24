import { NextRequest, NextResponse } from "next/server";
import { getRestaurant } from "@/lib/store";
import { generateHTML } from "@/templates";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = getRestaurant(id);
  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const html = generateHTML(r);
  const filename = `${r.name.toLowerCase().replace(/\s+/g, "-")}.html`;
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
