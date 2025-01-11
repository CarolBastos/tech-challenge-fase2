import React from "react";
import Image from "next/image";
// import "./header.scss";
import MobileNavbar from "../navbar/mobileNavbar";


interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="w-full text-sm text-white bg-primary-500 font-inter">
      <div className="max-w-sm flex flex-row-reverse items-center justify-between mx-auto py-7 md:max-w-md md:justify-items-end lg:max-w-lg lg:px-6">
        <div className="flex items-center gap-10">
          <span className="header__user-name">
            {userName}
          </span>
          <Image
            src="/images/user-icon.svg"
            alt="User Icon"
            width={40}
            height={40}
          />
        </div>

        <div className="header__mobile-navbar">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
