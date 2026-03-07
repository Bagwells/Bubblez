

export const BOOKING_SCRIPT_URL = process.env.NEXT_PUBLIC_BOOKING_SCRIPT_URL || "";
export const QUOTE_SCRIPT_URL = process.env.NEXT_PUBLIC_QUOTE_SCRIPT_URL || "";

export const sendToSheet = async (scriptUrl: string, data: URLSearchParams) => {
  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data,
    redirect: 'follow'
  });
  if (!response.ok) {
    throw new Error(`Failed to send to sheet: ${response.statusText}`);
  }
};

