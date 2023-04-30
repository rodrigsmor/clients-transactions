import { IconContext } from "react-icons";
import NavDropdown from "../navDropdown";
import { HiHome } from 'react-icons/hi';
import { TbFileInvoice } from 'react-icons/tb';
import { RiUploadCloud2Fill } from "react-icons/ri";

type HeaderProps = {
  pageTitle: string;
  name: 'home' | 'transactions' | 'newTransaction';
}

export const Header = ({ pageTitle, name }: HeaderProps) => {
  const icons = {
    'home': <HiHome />,
    'transactions': <TbFileInvoice />,
    'newTransaction': <RiUploadCloud2Fill />,
  }

  return (
    <header className="w-screen min-w-screen h-16 flex items-center justify-between bg-background-main shadow-main px-4 md:px-12 lg:px-16 fixed top-0 left-0 z-20">
      <h1 id="header_PageTitle" className="font-bold flex items-center gap-3 text-2xl md:text-[28px] text-typography-main">
        <IconContext.Provider value={{ className: 'text-primary-main', size: '20px' }}>
          { icons[name] }
        </IconContext.Provider>
        { pageTitle }
      </h1>
      <NavDropdown />
    </header>
  );
}