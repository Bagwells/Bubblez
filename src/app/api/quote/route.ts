import { NextRequest, NextResponse } from "next/server";
import { sendQuote } from "@/server/services/emailService";
import type { GetQuoteProps } from "@/types/quote";

export async function POST(request: NextRequest) {
  try {
    const data: GetQuoteProps = await request.json();
    await sendQuote(data);
    return NextResponse.json({
      success: true,
      message: "Quote sent successfully",
    });
  } catch (error: unknown) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
