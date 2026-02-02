


import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" ;
  size?: "sm" | "base" | "lg"; // let us restrict the size of the button to specific values
  loading?: boolean;
  fontStyle?: 'jakarta' | "mulish" ;
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'| 'full' | '48px' ;
  backgroundType?: 'solid' | 'outline' | 'custom'

}


export const Btn = ({
  children,
  disabled = false,
  className,
  type,
  onClick,
  size = 'base',
  fontStyle = 'jakarta',
  weight = 'semibold',
  radius = 'lg',
  backgroundType = 'solid'

}: ButtonProps) => {

  const btnSize = {
    sm: "text-sm px-5",
    base: "text-base px-6",
    lg: "text-lg px-6",
  };

  const font = {
    jakarta: 'font-jakarta',
    mulish: 'font-work'
    
  };

  const fontweight = {
    'light': 'font-light',
    'normal': 'font-normal',
    'medium': 'font-medium',
    'semibold': 'font-semibold',
    'bold': 'font-bold',
    'extrabold': 'font-extrabold',
  }

  const rounded = {
    'sm':'rounded-sm',
    'md':'rounded-md',
    'lg': 'rounded-lg',
    'xl':'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    '48px': 'rounded-[48px]',
    'full': 'rounded-full',
  }

  const mode = {
    'solid': 'bg-primary text-white border border-primary',
    'outline' : 'bg-white text-primary border border-primary',
    'custom' : null
  }

  return (
    <button
      className={`flex items-center justify-center ${mode[backgroundType]} ${rounded[radius]} outline-0 focus:outline-0 ring-0 rounded-lg cursor-pointer
        ${font[fontStyle]} ${fontweight[weight]} ${btnSize[size]} shadow-sm hover:shadow-lg hover:shadow-blue-200 hover:opacity-80 transition-shadow duration-300 ease-in 
        ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
} 