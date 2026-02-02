import { Router, Request, Response } from "express";
import { sendEmail, sendQuote } from "../services/emailService";
import type { BookingProps } from "@/types/booking";
import type { GetQuoteProps } from "@/types/quote";

const router = Router();

router.post("/book", async (req: Request, res: Response) => {
  try {
    const data: BookingProps = req.body;
    await sendEmail(data);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error: unknown) {
    res.status(500).json({
      error: "Failed to send email",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post("/quote", async (req: Request, res: Response) => {
  try {
    const data: GetQuoteProps = req.body;
    await sendQuote(data);
    res.json({ success: true, message: "Quote sent successfully" });
  } catch (error: unknown) {
    res.status(500).json({
      error: "Failed to send email",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
