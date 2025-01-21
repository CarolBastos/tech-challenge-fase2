import { SetStateAction, useEffect, useState } from "react";

import Image from "next/image";
import { navItems } from "./config";
import { useRouter } from "next/router";

export default function MobileNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(navItems[0].link);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (link: SetStateAction<string>) => {
    setActiveLink(link);
    setIsOpen(false);
  };

    useEffect(() => {
      const currentPath = router.pathname;
      const currentItem = navItems.find(item => `/${item.link}` === currentPath);
      if (currentItem) {
        setActiveLink(currentItem.link);
      }
    }, [router.pathname]);
  


  return (
    <div>
      <a
        href="/welcome"
        onClick={(e) => {
          e.preventDefault();
          toggleMenu();
        }}
        className="inline-block md:hidden lg:hidden"
      >
        <Image
          src="/images/icone-menu.svg"
          alt="ByteBank logo"
          width={32}
          height={32}
        />
      </a>

      {isOpen && (
        <div className="fixed top-0 left-0 w-[210px] h-auto bg-tertiary-400 shadow-lg z-50 flex flex-col items-center pl-5 pr-5 pb-7 pt-10">
          <button
            onClick={toggleMenu}
            className="absolute top-2 right-2 text-tertiary-500 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>
          <nav className="flex flex-col items-center w-full">
            {navItems.map((item, index) => (
              <a
                key={item.link}
                href={item.link}
                className={`block py-4 text-md text-black hover:bg-gray-200 text-center w-full ${
                  activeLink === item.link
                    ? "text-tertiary-500 font-bold border-b-2 border-tertiary-500"
                    : "text-black font-normal"
                } ${
                  index !== navItems.length - 1
                    ? "border-b border-black"
                    : ""
                }`}
                onClick={() => handleClick(item.link)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
