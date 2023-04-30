import { InputHTMLAttributes } from "react";

interface InputFormProps {
  name: string;
  type?: string;
  label: string;
  className?: string;
  placeholder: string;
  value?: string | number;
  isReadOnly?: boolean;
  isSecondary?: boolean;
  props?: InputHTMLAttributes<HTMLInputElement>;
}

export const InputForm = ({ name, type = 'text', value = '', isSecondary = false, isReadOnly = false, props, label, placeholder, className }: InputFormProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className={`font-semibold ${isReadOnly ? 'text-typography-light/60' : 'text-typography-light/80'}`}>{ label }</label>
      <input {...props} type={type} id={name} readOnly={isReadOnly} disabled={isReadOnly} value={value} placeholder={placeholder} className={`
          w-full text-lg px-3 py-2 rounded-md text-typography-main/70 border-2 placeholder:text-typography-light/30 focus:outline-none disabled:opacity-60
          ${isSecondary ? 'bg-secondary-main/5 border-secondary-main/20 focus:border-secondary-main/80' : 'bg-primary-light border-primary-main/20 focus:border-primary-main/80'}
        `}
      />
    </div>
  )
}