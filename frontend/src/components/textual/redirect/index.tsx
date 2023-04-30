import Link from "next/link";
import { MdOutlineArrowForwardIos } from 'react-icons/md';

interface RedirectProps {
  path: string;
  label?: string;
}

export const Redirect = ({ path, label = 'ver tudo' }: RedirectProps) => {
  return (
    <Link href={path} className="flex  items-center gap-2 font-semibold text-base text-secondary-main hover:opacity-70 duration-300 ease-out transition-all">
      {label} <MdOutlineArrowForwardIos />
    </Link>
  )
}