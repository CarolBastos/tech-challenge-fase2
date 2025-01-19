"use client";

import React, { useState } from "react";
import Image from "next/image";
import LoginForm from "../login/LoginForm";
import UserRegisterForm from "../user-register-form/UserRegisterForm";
import WelcomeCard from "../card/WelcomeCard";
import WelcomeFooter from "../footer/welcome-footer";
import WelcomeHeader from "../header/welcome-header";
import { WelcomeLayoutProps } from "../interfaces/welcome";

const WelcomeLayout: React.FC<WelcomeLayoutProps> = ({ advantages }) => {
  const [viewLoginForm, setViewLoginForm] = useState(false);
  const [viewUserRegisterForm, setUserRegisterForm] = useState(false);

  return (
    <div className="h-screen max-h-screen flex flex-col items-center">
      <WelcomeHeader
        onViewLoginForm={() => setViewLoginForm(true)}
        onViewUserRegisterForm={() => setUserRegisterForm(true)}
      />
      <main className="welcome-layout-main max-w-[100%] bg-gradient-to-b from-primary-500 to-neutral-100 flex-grow">
        <div className="w-full flex flex-col items-center mx-auto py-20 gap-10 md:max-w-md lg:max-w-lg lg:px-6">
          <div className="flex flex-col items-center justify-evenly gap-10 max-w-lg min-w-50 lg:flex-row">
            <h1 className="text-black text-center font-semibold text-xl md:text-2xl lg:max-w-lg lg:text-left lg:max-w-hero">
              Experimente mais liberdade no controle da sua vida financeira.
              Crie sua conta com a gente!
            </h1>
            <Image
              src="/images/hero-image.svg"
              alt="ByteBank logo"
              width={312}
              height={40}
              className="md:w-full lg:w-full lg:h-96"
            />
            <div className="w-full flex gap-6 md:hidden">
              <button
                className="w-full bg-black text-white py-4 rounded-lg"
                onClick={() => setUserRegisterForm(true)}
              >
                Abrir conta
              </button>
              <button
                onClick={() => setViewLoginForm(true)}
                className="w-full border-2 border-black text-black py-4 rounded-lg"
              >
                Já tenho conta
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-10 max-w-100 min-w-80">
            <h2 className="text-black text-center font-semibold text-lg md:text-xl">
              Vantagens do nosso banco:
            </h2>
            <div className="flex flex-col gap-10 px-4 md:px-0 md:grid grid-cols-2 lg:grid-cols-4 w-full">
              {advantages.map((advantage, index) => (
                <WelcomeCard
                  key={index}
                  cardImage={advantage.image}
                  cardAltImage={advantage.alt}
                  cardTitle={advantage.title}
                  cardText={advantage.text}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <LoginForm
        viewLoginForm={viewLoginForm}
        onClose={() => setViewLoginForm(false)}
      />
      <UserRegisterForm
        viewUserRegisterForm={viewUserRegisterForm}
        onClose={() => setUserRegisterForm(false)}
      />
      <WelcomeFooter />
    </div>
  );
};

export default WelcomeLayout;
