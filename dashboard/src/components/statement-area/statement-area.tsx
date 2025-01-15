  import { useState } from "react";
  import Image from "next/image";
  import { DateInput, SelectTypeTransaction, TransactionInput } from "./index";
  import { SearchTransaction, TypesOfTransaction } from "@/interfaces";
  import Button from "../button/button";
  
  interface StatementAreaProps {
    onSearch: (searchValues: SearchTransaction) => void;
  }

  export default function StatementArea({ onSearch }: StatementAreaProps) {
    const [transactionValue, setTransactionValue] = useState<string>("");
    const [dateTransaction, setDateTransaction] = useState<string>("");
    const [isFilled, setIsFilled] = useState(false);
    const [selectedType, setSelectedType] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTransactionValue(value);
    };

    function descriptionHandler(description: string): string {
      if (description == TypesOfTransaction.Deposito) {
        return 'Credit'
      } else if (description == TypesOfTransaction.Transferencia) {
        return 'Debit'
      } else {
        return 'Debit'
      }
    }

    function replaceCommaWithDot(value: string) {
      return value.replace(/,/g, '.');
    }

    const handleClick = async () => {
      if (!!selectedType || !!transactionValue || !!dateTransaction) {
        setIsFilled(true);
      }

      const transactionValueFormatted = replaceCommaWithDot(transactionValue);
      const amount = Number(transactionValueFormatted);

      const description = descriptionHandler(selectedType)

      const searchValues : SearchTransaction = {
        value: amount,
        description,
        date: dateTransaction
      }

      onSearch(searchValues)
    };

    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDateTransaction(event.target.value)
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelectedType(value);
    };

    return (
      <div className="relative w-full flex flex-col items-center gap-6 font-inter bg-neutral-300 p-8 max-[767px]:p-4 rounded-lg h-[39.5625rem] md:h-[29.875rem] md:items-start">
        <h2 className="text-xl text-center text-tertiary-300 font-semibold z-20">
          Buscar transação
        </h2>

        <SelectTypeTransaction
          className="z-20"
          label="Tipo de transferência"
          value={selectedType}
          onChange={handleSelectChange}
        />

        <TransactionInput
          className="z-20"
          label="Valor da Transação"
          value={transactionValue}
          onChange={handleChange}
        />

        <DateInput className="z-20" label="Período da transação" value={dateTransaction} onChange={handleChangeDate}
        />

        {!isFilled && <p className="text-red-500 mt-2">Preencha alguma opção de busca</p>}

        <div className="mt-8">
          <Button className="max-w-[9rem] md:max-w-[15.625rem] md:w-full relative z-20" text="Pesquisar" onClick={handleClick} />
        </div>

        <Image
          src="/images/newtransaction-illustration.svg"
          alt=""
          width={32}
          height={32}
          className='absolute bottom-6 w-[16.5rem] md:w-[17.6875rem] z-0 max-[767px]:left-6 min-[768px]:right-6 lg:hidden'
        />
        <Image
          src="/images/newtransaction-bg-squares-1.svg"
          alt="Quadrado superior"
          width={32}
          height={32}
          className='w-[9.125rem] absolute top-0 z-0 max-[767px]:left-0 min-[768px]:right-0'
        />
        <Image
          src="/images/newtransaction-bg-squares-1.svg"
          alt="Quadrado inferior"
          width={32}
          height={32}
          className='w-[9.125rem] absolute bottom-0 right-0 z-0 md:left-0'
        />

      </div>
    );
  }
