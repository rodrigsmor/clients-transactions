import { VscLoading } from 'react-icons/vsc';
import { ButtonHTMLAttributes } from "react";

interface CtaButtonProps {
  label: string;
  className?: string;
  isLoading?: boolean;
  type: 'submit' | 'button';
  props?: ButtonHTMLAttributes<HTMLElement>;
}

export const CtaButton = ({ label, props, type, className, isLoading = false }: CtaButtonProps) => {
  return (
    <button type={type} {...props} disabled={isLoading} className={`flex items-center justify-center font-semibold text-background-dark px-7 w-fit hover:bg-primary-dark transition-all duration-300 bg-primary-main h-11 min-h-11 flex-shrink-0 rounded-xl ${className} ${isLoading && '!bg-primary-dark'}`}>
      {isLoading ? <VscLoading className='text-background-main animate-spin' /> : label }
    </button>
  )
}