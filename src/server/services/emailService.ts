import type { BookingProps } from "@/types/booking";
import type { GetQuoteProps } from "@/types/quote";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: 587,
  secure: false,
  authMethod: "PLAIN",
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const mail = process.env.EMAIL_USER || "";

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

  const emailContent = `
    Client Name: ${firstName} ${lastName}
    Email: ${email}
    Phone: ${phone}
    Property Address: ${property_Address}
    message: ${message}
    Booking Details:
    Service Type: ${service_type}
    Property Size: ${size.livingrooms} LR, ${size.bedrooms} BR, ${size.bathrooms} BA
    Extra Services: ${extra_services}
    Frequency: ${frequency}
    Date: ${date}
    Time: ${time}
  `;

  try {
    await transporter.sendMail({
      from: mail,
      to: mail,
      subject: `New Booking Request from ${firstName} ${lastName}`,
      text: emailContent,
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

  const quoteContent = `
    Client Name: ${firstName} ${lastName}
    Email: ${email}
    Phone: ${phone}
    Property Address: ${property_address}
    Service Interested In: ${service_type}
    Time & Date: ${time} ${date}
    message: ${message}
  `
  
  try{
    await transporter.sendMail({
      from: mail,
      to: mail,
      subject: `Quote Resquest from ${firstName} ${lastName}`,
      text: quoteContent,
      replyTo: data.email
    })
  } catch (error) {
    console.error("Email service connection failed:", error);
    throw error;
  }
}
