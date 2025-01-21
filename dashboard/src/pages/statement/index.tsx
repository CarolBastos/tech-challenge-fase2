"use client"

import Header from '@/components/header/header';
import Navbar from '@/components/navbar/navbar';
import { StatementArea } from '@/components/statement-area';
import useAccount from '@/hooks/useAccount';
import { SearchTransaction, Transaction, TypesOfTransaction } from '@/interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import ClientStatement from '@/components/userStatement/userStatement';
import { descriptionHandler, formattedDate } from '@/utils';
import useStatement from '@/hooks/useStatement';
import { statement } from '@/mocks/statement';

const LoggedInLayout: React.FC = () => {
  const { user, setUser } = useAccount();
  const {transactions, setTransactions} = useStatement();
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [loading, setLoading] = useState<boolean>(false);
  const [allTransactionsLoaded, setAllTransactionsLoaded] = useState<boolean>(false);
  const transactionsLoadInitially = 6;

  useEffect(() => {
    setTransactions(transactions.slice(0, transactionsLoadInitially));
    setFilteredTransactions(transactions)
  }, [])

  

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

    const nextTransactions = transactions.slice(
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

  const resetTransactions = () => {
    setFilteredTransactions(transactions)
  }

  const filterTransactions = (searchValues: SearchTransaction) => {
    let filteredTransactions = transactions;

    if (searchValues.value > 0) {
      filteredTransactions = filteredTransactions.filter(
        transaction => transaction.amount === searchValues.value
      );
    }

    if (searchValues.description.trim() !== '') {
      filteredTransactions = filteredTransactions.filter(

        transaction => {
          let desc = descriptionHandler(transaction.description)
          return desc === searchValues.description
        }
      );
    }

    if (searchValues.date.trim() !== '') {
      filteredTransactions = filteredTransactions.filter(
        transaction => {
          return  formattedDate(transaction.date) === searchValues.date
        }
      );
    }

    setFilteredTransactions(filteredTransactions);
  };

  return (
    <div>
      <Header userName={user?.name} />
      <main className="w-full bg-tertiary-400 max-[1023px]:pb-9">
        <section className="sm:max-w-sm h-full flex flex-col mx-auto pt-6 md:max-w-md gap-8 lg:max-w-max lg:flex-row lg:px-6">
          <div className="main-logged__side-menu">
            <Navbar />
          </div>

          <div className="w-full flex flex-col gap-6 pb-6">
            <StatementArea onSearch={filterTransactions}  handleResetResult={resetTransactions} />
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
                transactions={filteredTransactions.length == 0 ? transactions : filteredTransactions}
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