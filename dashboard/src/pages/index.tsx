"use client"

import Balance from '@/components/balance/balance';
import Header from '@/components/header/header';
import Navbar from '@/components/navbar/navbar';
import { NewTransaction } from '@/components/new-transaction';
import useAccount from '@/hooks/useAccount';
import { Transaction, TypesOfTransaction } from '@/interfaces';
import { statement } from '@/mocks/statement';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import ClientStatement from '@/components/userStatement/userStatement';
import { Provider } from 'react-redux';
import store from '@/store';
import useStatement from '@/hooks/useStatement';

const LoggedInLayout: React.FC = () => {
  const { user, setUser } = useAccount();
  const {transactions, setTransactions} = useStatement();
  const [loading, setLoading] = useState<boolean>(false);
  const [allTransactionsLoaded, setAllTransactionsLoaded] = useState<boolean>(false);
  const transactionsLoadInitially = 6;

  useEffect(() => {
    setTransactions(statement.transactions.slice(0, transactionsLoadInitially));
  }, [])

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

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const atBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 5;

    if (atBottom && !loading && !allTransactionsLoaded) {
      loadMoreTransactions();
    }
  }, [loading, allTransactionsLoaded]);

  const loadMoreTransactions = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const nextTransactions = statement.transactions.slice(
      transactions.length,
      transactions.length + transactionsLoadInitially
    );

    if (nextTransactions.length > 0) {
      setTransactions((prev) => [...prev, ...nextTransactions]);
    } else {
      setAllTransactionsLoaded(true);
    }

    setLoading(false);
  }, [transactions.length, transactionsLoadInitially]);

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
            <Provider store = {store}>
            <NewTransaction updateBalance={updateBalance} updateStatement={updateStatement}balance={user ? user.balance : 0}/>
            </Provider>
            
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
            <div className='flex flex-col gap-6 overflow-y-auto pr-2 custom-scroll' onScroll={handleScroll} >
              <ClientStatement 
                transactions={transactions} 
              />
              {loading && (
                <p className="text-center text-sm text-gray-500 mt-4 animate-pulse">
                  Carregando mais transações...
                </p>
              )}
              {allTransactionsLoaded && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Não há mais transações a carregar.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoggedInLayout;