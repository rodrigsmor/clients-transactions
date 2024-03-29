import Image from "next/image";
import { useRouter } from "next/router";
import { IoExitOutline } from 'react-icons/io5';
import { FiMoreVertical } from 'react-icons/fi';
import DEFAULT_PROFILE_PICTURE from '@images/DEFAULT_PROFILE_PICTURE.png';
import { HiHome } from 'react-icons/hi'
import { TbFileInvoice } from "react-icons/tb";
import { IconContext } from "react-icons";
import Link from "next/link";
import { KeyboardEvent, MouseEvent, useContext, useState } from "react";
import AppContext from "src/utils/context/appContext";
import apiClient from "src/utils/config/api.client";
import { toast } from "react-hot-toast";

const NavDropdown = () => {
  const { pathname, push } = useRouter();
  const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);

  const { user } = useContext(AppContext);

  const pages = [
    {
      id: 0,
      label: 'Visão geral',
      Icon: <HiHome />,
      link: '/app/home',
    }, {
      id: 1,
      label: 'Transações',
      Icon: <TbFileInvoice />,
      link: '/app/transactions',
    },
  ]

  const handleKeyboardClick = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ')
      setIsDropdownActive(!isDropdownActive);
  }

  const onLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    apiClient.post('/auth/logout')
      .then(() => {
        localStorage.clear();
        push('/login')
      }).catch(({ response: { data } }) => {
        toast.error(data.error.message);
      })
  }

  return (
    <div className="relative">
      <div onClick={e => setIsDropdownActive(!isDropdownActive)} onKeyDown={handleKeyboardClick} tabIndex={1} className="w-14 md:w-fit h-14 md:h-fit flex items-center gap-3 px-2 py-1 rounded-2xl duration-300 ease-out transition-all hover:bg-background-dark cursor-pointer">
        <Image src={DEFAULT_PROFILE_PICTURE} width={44} height={44} alt="admin user profile" className="object-cover rounded-full p-1 border-[3px] border-typography-main/10" />
        <div className="hidden md:flex flex-col w-40 overflow-hidden">
          <p className="text-sm leading-4 font-semibold text-typography-light w-full truncate max-w-full overflow-hidden">{user?.name}</p>
          <p className="text-xs leading-5 font-regular text-typography-light/60 w-full max-w-full overflow-hidden truncate">Administrador</p>
        </div>
        <FiMoreVertical size={20} className="text-typography-main/80" />
      </div>
      <nav className={`absolute w-[85vw] md:w-[35vw] lg:w-80 right-0 bg-background-main top-16 gap-4 shadow-light rounded-2xl p-4 flex flex-col justify-center items-center md:translate-x-6 duration-300 ease-out transition-all ${isDropdownActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <header className="w-full max-w-full overflow-hidden">
          <h3 className="font-medium text-base max-w-full truncate">Olá, <span className="font-semibold text-primary-main">{user?.name.split(' ')[0]}</span>!</h3>
        </header>
        <ul className="w-full flex flex-col gap-2">
          {
            pages.map(({ id, label, link, Icon }) => {
              let isCurrent = pathname === link;
              return (
                <li key={id} className="w-full">
                  <Link tabIndex={isDropdownActive ? 1 : -1} href={link} aria-current={isCurrent} className={`w-full flex gap-2 items-center rounded-md px-2 py-1 duration-300 ease-in transition-all hover:bg-background-dark ${isCurrent ? 'bg-background-dark text-primary-main font-semibold' : 'text-typography-light/60 font-regular'} ${!isDropdownActive && 'pointer-events-none'}`}>
                    <IconContext.Provider value={{ className: `opacity-40`, size: '18px' }}>
                      {Icon}
                    </IconContext.Provider>
                    {label}
                  </Link>
                </li>
              )
            })
          }
        </ul>
        <footer className="w-full items-center justify-center flex">
          <button onClick={onLogout} className="bg-transparent gap-2 flex items-center text-error-main font-medium hover:bg-error-light/50 duration-300 px-5 py-1 rounded-xl" tabIndex={isDropdownActive ? 1 : -1}>
            <IoExitOutline /> sair
          </button>
        </footer>
        <div className="h-6 w-9 flex items-center flex-col justify-start max-w-6 max-h-6 overflow-hidden absolute right-3 md:right-6 -top-6">
          <div className="shadow-light h-9 w-9 flex-shrink-0 mt-3 rotate-45 bg-background-main"></div>
        </div>
      </nav>
    </div>
  );
}

export default NavDropdown;