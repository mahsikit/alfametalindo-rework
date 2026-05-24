import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  industry: z.string().max(50).optional(),
  product: z.string().max(200).optional(),
  message: z.string().min(5).max(2000),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Email delivery not configured yet — log the submission and return success.
  console.log("Contact form submission:", result.data);

  return NextResponse.json({ ok: true }, { status: 200 });
}
