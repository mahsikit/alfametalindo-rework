import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const { name, email, company, industry, product, message } = result.data;

  console.log("Contact form submission:", result.data);

  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: "Alfa Metalindo Web <onboarding@resend.dev>",
        to: ["marketing@alfametalindo.com"], 
        replyTo: email,
        subject: `New Web Inquiry from ${name} (${company || "Individual"})`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "-"}</p>
          <p><strong>Industry:</strong> ${industry || "-"}</p>
          <p><strong>Product Interest:</strong> ${product || "-"}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="white-space: pre-wrap;">${message}</blockquote>
        `,
      });
    } catch (error) {
      console.error("Resend error:", error);
      // We still return 200 so the user isn't alarmed if email fails
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
