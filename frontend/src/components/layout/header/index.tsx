import { IconContext } from "react-icons";
import NavDropdown from "../navDropdown";
import { HiHome } from 'react-icons/hi';
import { TbFileInvoice } from 'react-icons/tb';

type HeaderProps = {
  pageTitle: string;
  name: 'home' | 'transactions';
}

export const Header = ({ pageTitle, name }: HeaderProps) => {
  return (
    <header className="w-screen h-16 flex items-center justify-between bg-background-main shadow-main px-4 md:px-12 lg:px-16 fixed top-0 left-0 z-20">
      <h2 className="font-bold flex items-center gap-3 text-[28px] text-typography-main">
        <IconContext.Provider value={{ className: 'text-primary-main', size: '20px' }}>
          { name === 'home' ? <HiHome /> : <TbFileInvoice /> }
        </IconContext.Provider>
        { pageTitle }
      </h2>
      <NavDropdown />
    </header>
  );
}