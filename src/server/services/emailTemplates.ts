

import type { BookingProps } from "@/types/booking";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
import type { GetQuoteProps } from "@/types/quote";
import type { ContactProps } from "@/types/contact";

const BRAND = {
  name: "Bubblez",
  primary: "#195DCA",
  primaryDark: "#1450C2",
  bg: "#F7FCFF",
  cardBg: "#ffffff",
  text: "#1E1E1E",
  textMuted: "#8D8D8D",
  border: "#E9E9E9",
};

function baseWrapper(content: string, title: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color: ${BRAND.bg}; color: ${BRAND.text};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${BRAND.bg}; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: ${BRAND.cardBg}; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%); padding: 24px 28px; text-align: center;">
              <h1 style="margin:0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">${BRAND.name}</h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.9);">Cleaning Services</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 28px; background-color: #f9fafb; border-top: 1px solid ${BRAND.border}; font-size: 12px; color: ${BRAND.textMuted}; text-align: center;">
              This request was sent from your Bubblez website. Reply directly to this email to respond to the client.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function listItem(label: string, value: string): string {
  const safeValue = value ? escapeHtml(value) : "—";
  return `
  <li style="list-style: none; padding: 12px 0; border-bottom: 1px solid ${BRAND.border}; margin: 0;">
    <span style="display: block; font-size: 12px; color: ${BRAND.textMuted}; font-weight: 600; margin-bottom: 4px;">${label}</span>
    <span style="font-size: 15px; color: ${BRAND.text}; line-height: 1.4;">${safeValue}</span>
  </li>`;
}

function sectionTitle(title: string): string {
  return `
  <h2 style="margin: 0; padding: 18px 0 10px 0; font-size: 14px; font-weight: 700; color: ${BRAND.primary}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid ${BRAND.border};">
    ${title}
  </h2>`;
}

function sectionList(items: string[]): string {
  return `
  <ul style="margin: 0 0 8px 0; padding: 0;">
    ${items.join("")}
  </ul>`;
}

export function bookingTemplate(options: BookingProps): string {
  const {
    firstName,
    lastName,
    email,
    phone,
    property_Address,
    message,
    service_type,
    size,
    extra_services,
    frequency,
    date,
    time,
  } = options;

  const contactItems = [
    listItem("Name", `${firstName} ${lastName}`),
    listItem("Email", email),
    listItem("Phone", phone),
    listItem("Property address", property_Address),
    listItem("Message", message),
  ];
  const bookingItems = [
    listItem("Service type", service_type),
    listItem("Property size", `${size.livingrooms} living room(s), ${size.bedrooms} bedroom(s), ${size.bathrooms} bathroom(s)`),
    listItem("Extra services", extra_services),
    listItem("Frequency", frequency),
    listItem("Preferred date", date),
    listItem("Preferred time", time),
  ];

  const content = `
<div style="max-width: 100%;">
  <h1 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: ${BRAND.text};">New Booking Request</h1>
  <p style="margin: 0 0 20px 0; font-size: 14px; color: ${BRAND.textMuted};">A client has requested a cleaning service booking.</p>
  ${sectionTitle("Contact details")}
  ${sectionList(contactItems)}
  ${sectionTitle("Booking details")}
  ${sectionList(bookingItems)}
</div>`;

  return baseWrapper(content, `Booking from ${firstName} ${lastName}`);
}

export function quoteTemplate(data: GetQuoteProps): string {
  const {
    firstName,
    lastName,
    email,
    phone,
    property_address,
    date,
    time,
    message,
    service_type,
  } = data;

  const contactItems = [
    listItem("Name", `${firstName} ${lastName}`),
    listItem("Email", email),
    listItem("Phone", phone),
    listItem("Property address", property_address),
    listItem("Message", message),
  ];
  const quoteItems = [
    listItem("Service interested in", service_type),
    listItem("Preferred date & time", `${date} · ${time}`),
  ];

  const content = `
<div style="max-width: 100%;">
  <h1 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: ${BRAND.text};">Quote Request</h1>
  <p style="margin: 0 0 20px 0; font-size: 14px; color: ${BRAND.textMuted};">A client has requested a quote.</p>
  ${sectionTitle("Contact details")}
  ${sectionList(contactItems)}
  ${sectionTitle("Quote details")}
  ${sectionList(quoteItems)}
</div>`;

  return baseWrapper(content, `Quote request from ${firstName} ${lastName}`);
}

export function supportTemplate(data: ContactProps): string {
  const { firstName, lastName, email, phone, message } = data;

  const contactItems = [
    listItem("Name", `${firstName} ${lastName}`),
    listItem("Email", email),
    listItem("Phone", phone),
  ];

  const content = `
<div style="max-width: 100%;">
  <h1 style="margin: 0 0 4px 0; font-size: 18px; font-weight: 700; color: ${BRAND.text};">Support / Contact Request</h1>
  <p style="margin: 0 0 20px 0; font-size: 14px; color: ${BRAND.textMuted};">A client has sent a message via the contact form.</p>
  ${sectionTitle("Contact details")}
  ${sectionList(contactItems)}
  ${sectionTitle("Message")}
  <div style="padding: 12px 0 0 0; font-size: 15px; color: ${BRAND.text}; line-height: 1.5;">${message ? escapeHtml(message) : "—"}</div>
</div>`;

  return baseWrapper(content, `Support from ${firstName} ${lastName}`);
}
