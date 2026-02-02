/**
 * Shared type for free quote form payload.
 * Used by the Free Quote modal (frontend) and quote API (server).
 */
export interface GetQuoteProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  property_address: string;
  message: string;
  service_type: string;
}
