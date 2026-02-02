import { Router, Request, Response } from "express";
import type { ContactProps } from "@/types/contact";
import { sendSupportEmail } from "../services/contactService";



const router = Router();


router.post("/", async (req: Request, res: Response) => {
    try {
      const data: ContactProps = req.body;
      await sendSupportEmail(data);
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error: unknown) {
      res.status(500).json({
        error: "Failed to send email",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

export default router;