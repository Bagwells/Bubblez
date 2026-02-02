

export type NavProps = {
    label: string;
    href: string;
  };
  
  export const NavItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ] as NavProps[];