import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/server/services/emailService";
import type { BookingProps } from "@/types/booking";

export async function POST(request: NextRequest) {
  try {
    const data: BookingProps = await request.json();
    await sendEmail(data);
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: unknown) {
    console.error("Book API error:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
