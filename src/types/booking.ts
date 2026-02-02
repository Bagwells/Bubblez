/**
 * Shared type for booking form payload.
 * Used by the Book Service modal (frontend) and book API (server).
 */
export interface BookingProps {
  service_type:
    | "Residential"
    | "Commercial"
    | "Post-Construction"
    | "Specialty";
  size: {
    livingrooms: number;
    bedrooms: number;
    bathrooms: number;
  };
  extra_services: string;
  frequency: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  property_Address: string;
  message: string;
}
