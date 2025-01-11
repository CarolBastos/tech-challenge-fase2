"use client";

import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CurrentDate from './current-date';
import { User } from '@/interfaces';

interface BalanceProps {
  user: User | null; 
}

const Balance: React.FC<BalanceProps> = ({ user }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const formatBalance = (balance: number) => {
    return balance.toFixed(2).replace('.', ',');
  };

  return (
    <div className="relative h-[40.9375rem] w-full items-center bg-primary-500 text-white font-inter p-10 rounded-lg md:h-[25.125rem] md:flex z-20">
      <div className="w-full flex flex-col items-center gap-6 mb-10 md:h-full md:items-start md:m-0">
        {user ? (
          <h1 className="text-white text-xl font-semibold">
            Olá, {user.name?.split(' ')[0]}! :)
          </h1>
        ) : ''}
        <CurrentDate />
      </div>
      <div className="w-full flex flex-col gap-4 z-20">
        <div className="flex items-center pb-4 border-b-2 gap-6 lg:border-secondary-500">
          <p className="text-lg">Saldo</p>
          {isBalanceVisible ? (
            <EyeIcon
              className="w-6 h-6 cursor-pointer lg:text-secondary-500"
              onClick={toggleBalanceVisibility}
            />
          ) : (
            <EyeOffIcon
              className="w-6 h-6 cursor-pointer lg:text-secondary-500"
              onClick={toggleBalanceVisibility}
            />
          )}
        </div>

        <p className="text-sm">
          Conta Corrente
        </p>
        {isBalanceVisible ? (
          <p className="text-3xl">
            R$ {user ? formatBalance(user.balance ?? 0) : ''}
          </p>
        ) : (
          <p className="text-3xl">******</p>
        )}
      </div>
      <Image
            src="/images/balance-illustration.svg"
            alt="ByteBank logo"
            width={32}
            height={32}
            className='absolute bottom-6 left-6 w-[16.5rem] z-10 md:w-[17.6875rem] lg:hidden'
      />
      <Image
            src="/images/balance-bg-squares-1.svg"
            alt="Quadrado superior"
            width={32}
            height={32}
            className='absolute top-0 max-[767px]:left-0 w-auto z-0 min-[768px]:right-0 lg:hidden'
      />
      <Image
            src="/images/balance-bg-squares-2.svg"
            alt="Quadrado inferior"
            width={32}
            height={32}
            className='absolute bottom-0 right-0 w-auto z-0 md:left-0 lg:hidden'
      />
    </div>
  );
};

export default Balance;

