interface InputFormProps {
  name: string;
  type?: string;
  label: string;
  className?: string;
  placeholder: string;
}

export const InputForm = ({ name, type = 'text', label, placeholder, className }: InputFormProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className='text-typography-light/80 font-semibold'>{ label }</label>
      <input type={type} id={name} placeholder={placeholder} className='w-full text-lg px-3 py-2 rounded-md bg-primary-light text-typography-main/70 border-2 border-primary-main/20 placeholder:text-typography-light/30 focus:outline-none focus:border-primary-main/80' />
    </div>
  )
}