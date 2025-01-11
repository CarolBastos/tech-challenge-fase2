import { SetStateAction, useState } from "react";
import { navItems } from "./config";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(navItems[0].link);

  const handleClick = (link: SetStateAction<string>) => {
    setActiveLink(link);
  };

  return (
    <div className="navbar hidden lg:w-[182px] lg:h-full md:inline md:bg-transparent lg:flex lg:flex-col lg:bg-neutral-100 text-center rounded-t-lg">
      <nav className="flex lg:flex-col lg:p-8 md:p-0 md:px-4 bg-neutral-100 md:bg-transparent rounded-lg">
        {navItems.map((item, index) => (
          <a
            key={item.link}
            href={`#${item.link}`}
            className={`w-full py-4 ${
              activeLink === item.link
                ? 'text-tertiary-500 font-semibold border-b-2 border-tertiary-500 lg:pt-4'
                : 'lg:border-b lg:border-black lg:pt-4'
            } ${index === navItems.length - 1 ? 'lg:border-none' : ''}`}
            onClick={() => handleClick(item.link)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
