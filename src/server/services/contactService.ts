import type { ContactProps } from "@/types/contact";
import { mail } from "./emailService";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendSupportEmail = async(data: ContactProps):Promise<void> => {
    const {
      firstName,
      lastName,
      email,
      phone,
      message
    } = data;
  
    const supportContent = `
      Client Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      message: ${message}
    `
    
    try{
      await transporter.sendMail({
        from: mail,
        to: mail,
        subject: `Support Request from ${firstName} ${lastName}`,
        text: supportContent,
        replyTo: data.email
      })
    } catch (error) {
      console.error("Email service connection failed:", error);
      throw error;
    }
  }