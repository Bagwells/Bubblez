import type { BookingProps } from "@/types/booking";
import type { GetQuoteProps } from "@/types/quote";
import nodemailer from "nodemailer";
import { bookingTemplate, quoteTemplate } from "./emailTemplates";


export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export const mail = process.env.EMAIL_USER as string;

export const sendEmail = async (options: BookingProps): Promise<void> => {
  const {
    service_type,
    size,
    extra_services,
    frequency,
    date,
    time,
    firstName,
    lastName,
    email,
    phone,
    property_Address,
    message,
  } = options;

  const textContent = `Client: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${property_Address}\nMessage: ${message}\n\nBooking: ${service_type} | ${size.livingrooms} LR, ${size.bedrooms} BR, ${size.bathrooms} BA | ${extra_services} | ${frequency} | ${date} ${time}`;

  try {
    await transporter.sendMail({
      from: mail,
      to: mail,
      subject: `New Booking Request from ${firstName} ${lastName}`,
      text: textContent,
      html: bookingTemplate(options),
      replyTo: options.email
    });
    console.log(`Email sent successfully to ${mail}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const verifyEmailConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log("Email service connected successfully");
    return true;
  } catch (error) {
    console.error("Email service connection failed:", error);
    return false;
  }
};


export const sendQuote = async (data: GetQuoteProps): Promise<void> => {
  const {
    firstName,
    lastName,
    email,
    phone,
    property_address,
    date,
    time,
    message,
    service_type
  } = data;

  const quoteText = `Client: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${property_address}\nService: ${service_type}\nDate & time: ${date} ${time}\nMessage: ${message}`;

  try {
    await transporter.sendMail({
      from: mail,
      to: mail,
      subject: `Quote Request from ${firstName} ${lastName}`,
      text: quoteText,
      html: quoteTemplate(data),
      replyTo: data.email
    });
  } catch (error) {
    console.error("Email service connection failed:", error);
    throw error;
  }
}
