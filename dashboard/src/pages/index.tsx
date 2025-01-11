"use client"

import Balance from '@/components/balance/balance';
import Header from '@/components/header/header';
import Navbar from '@/components/navbar/navbar';
import { NewTransaction } from '@/components/new-transaction';
import useAccount from '@/hooks/useAccount';
import { Transaction } from '@/interfaces';
import { statement } from '@/mocks/statement';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ClientStatement from '@/components/userStatement/userStatement';

const LoggedInLayout: React.FC = () => {
  const { user, setUser } = useAccount();
  const [transactions, setTransactions] = useState(statement?.transactions.slice().reverse());

  // Monitora as mudanças no `statement` e atualiza `transactions`
    useEffect(() => {
        setTransactions(statement?.transactions.slice().reverse());
    }, [statement]);

  const updateBalance = (transactionAmount: number): void => {
    if (user) {
      setUser({ ...user, balance: transactionAmount });
    }
  };

  const updateStatement = (transaction: Transaction): void => {
    if (transactions) {
      setTransactions((prevTransactions: any) => [transaction, ...prevTransactions]);
    }
  };

  return (
    <div>
      <Header userName={user?.name} />
      <main className="w-full bg-tertiary-400 max-[1023px]:pb-9"> 
        <section className="max-w-sm h-full flex flex-col mx-auto pt-6 md:max-w-md gap-8 lg:max-w-lg lg:flex-row lg:px-6">
          <div className="main-logged__side-menu">
            <Navbar />
          </div>

          <div className="w-full flex flex-col gap-6 pb-6">
            <Balance user={user} />
            <NewTransaction updateBalance={updateBalance} updateStatement={updateStatement}balance={user ? user.balance : 0}/>
          </div>

          <div className="main-logged lg:w-[282px] md:w-full h-[650px] px-6 py-8 bg-neutral-200 rounded-lg">
            <div className='flex gap-12 items-center justify-between mb-6'>
              <div className='font-bold text-xl'>
                Extrato
              </div>
              <div className='flex justify-between gap-4'>
                <button className='flex items-center justify-center rounded-full bg-sky-900 h-10 w-10'>
                  <Image src="/images/pencil.svg" alt="imagem" width={24} height={36} />
                </button>
                <button className='flex items-center justify-center rounded-full bg-sky-900 h-10 w-10'>
                  <Image src="/images/trash.svg" alt="imagem" width={24} height={36} />
                </button>
              </div>
            </div>
            <div className='flex flex-col gap-6 h-[500px] overflow-y-auto pr-2 custom-scroll'>
              <ClientStatement transactions={transactions}/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoggedInLayout;