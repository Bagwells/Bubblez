import { NextRequest, NextResponse } from "next/server";
import { sendSupportEmail } from "@/server/services/contactService";
import type { ContactProps } from "@/types/contact";

export async function POST(request: NextRequest) {
  try {
    const data: ContactProps = await request.json();
    await sendSupportEmail(data);
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
