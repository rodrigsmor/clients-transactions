import { ButtonHTMLAttributes } from "react";

interface CtaButtonProps {
  label: string;
  className?: string;
  type: 'submit' | 'button';
  props?: ButtonHTMLAttributes<HTMLElement>;
}

export const CtaButton = ({ label, props, type, className }: CtaButtonProps) => {
  return (
    <button type={type} {...props} className={`flex items-center justify-center font-semibold text-background-dark px-7 w-fit hover:bg-primary-dark transition-all duration-300 bg-primary-main h-11 min-h-11 flex-shrink-0 rounded-xl ${className}`}>
      { label }
    </button>
  )
}