import type { ContactProps } from "@/types/contact";
import { mail, transporter } from "./emailService";
import { supportTemplate } from "./emailTemplates";

export const sendSupportEmail = async (data: ContactProps): Promise<void> => {
  const { firstName, lastName, email, phone, message } = data;

  const supportText = `Client: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;

  try {
    await transporter.sendMail({
      from: mail,
      to: mail,
      subject: `Support Request from ${firstName} ${lastName}`,
      text: supportText,
      html: supportTemplate(data),
      replyTo: data.email
    });
  } catch (error) {
    console.error("Email service connection failed:", error);
    throw error;
  }
};