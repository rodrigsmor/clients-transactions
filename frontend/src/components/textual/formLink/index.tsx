import Link from "next/link"
import { ReactElement } from "react"
import { IconContext } from "react-icons"

type FormLink = {
  name: string,
  path: string,
  label: string,
  caption: string,
  Icon: ReactElement,
}

export const FormLink = ({ Icon, label, path, name, caption }: FormLink) => {
  return (
    <Link href={path} className='w-full flex items-center gap-2 text-background-main bg-primary-main duration-300 hover:bg-primary-dark transition-all ease-out rounded-2xl shadow-light p-4'>
      <IconContext.Provider value={{ className: 'text-background-main', size: '24px' }}>
        { Icon }
      </IconContext.Provider>
      <div className="w-full flex flex-col gap-1">
        <p id={`formLink_title-${name}`} className="text-base leading-4 font-semibold">{ label }</p>
        <p className="w-full opacity-80 text-sm font-regular leading-4">{ caption }</p>
      </div>
    </Link>
  )
}