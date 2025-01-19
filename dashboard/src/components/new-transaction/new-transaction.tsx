import { useState } from "react";
import Image from "next/image";
import { SelectOption, TransactionInput } from "./index";
import { Transaction, TypesOfTransaction } from "@/interfaces";
import Button from "../button/button";
import { useSelector } from "react-redux";
import AttachmentUploader from "../attachment-uploader/attachment-uploader";


interface NewTransactionProps {
  balance: number ;
  updateBalance: (transactionAmount: number) => void;
  updateStatement: (transaction: Transaction) => void;
}

export default function NewTransaction({ updateBalance, updateStatement, balance }: NewTransactionProps) {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [transactionValue, setTransactionValue] = useState<string>("");
  const [hasError, setHasError] = useState(false);
  const [isValueRequired, setIsValueRequired] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    setHasError(false);
  };

  const transactionsTypes = useSelector((state) => state.transactionTypes.types);
  const transactionsNames = useSelector((state) => state.transactionsName.names);
  console.log(transactionsTypes);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTransactionValue(value);

    if (value) {
      setIsValueRequired(false);
    }
  };

  function descriptionHandler(description: string): TypesOfTransaction{
    if(description == 'Empréstimo e Financiamento'){
      return transactionsTypes[0];
    } else if(description == 'DOC/TED'){
      return transactionsTypes[2];
    }else{
      return transactionsTypes[0];
    }
  }

  function replaceCommaWithDot(value: string) {
    return value.replace(/,/g, '.');
  }

  const handleBalance = async () => {
    const newTransactionValue = replaceCommaWithDot(transactionValue);
    const amount = Number(newTransactionValue);

    if (isNaN(amount) || amount <= 0) {
      console.error("Invalid transaction amount");
      return;
    }
      
    const description = descriptionHandler(selectedValue)

    let newBalance: number;
    if (description === TypesOfTransaction.Deposito) { 
      newBalance = balance + amount;
    } else { 
      if (balance >= amount) {
        newBalance = balance - amount; 
      } else {
        newBalance = balance;
        console.log("não foi possivel retirar o saldo", newBalance)
      }
    }

    updateBalance(newBalance);
  }

  const handleFileSelect = (file: File | null) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFile(base64String);  
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setFile("");
    }
  };

  const handleClick = async () => {
    if (!selectedValue) {
      setHasError(true);
      return;
    }

    if (!transactionValue) {
      setIsValueRequired(true);
      return; 
    }

    const newTransactionValue = replaceCommaWithDot(transactionValue);
    const amount = Number(newTransactionValue);

    if (isNaN(amount) || amount <= 0) {
      console.error("Invalid transaction amount");
      return;
    }
      const transaction = {
        amount: amount,
        description: descriptionHandler(selectedValue),
        date: new Date().toISOString(),
        anexo: file
      }
  
      try {
        const response = await fetch("../../api/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( transaction )
        });
  
        if (response.ok) {
          const newTransaction = await response.json();
          console.log("Transaction created:", newTransaction);
          await handleBalance();
          setSelectedValue("");
          setTransactionValue("");
          setFile("");
          updateStatement(newTransaction);
    
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-6 font-inter bg-neutral-300 p-8 max-[767px]:p-4 rounded-lg h-[39.5625rem] md:h-[29.875rem] md:items-start">
      <h2 className="text-xl text-center text-tertiary-300 font-semibold z-20">
        Nova transação
      </h2>

      <div className="relative w-full">
        <button
          type="button"
          className="relative w-full flex justify-between items-center text-left text-sm p-3 bg-neutral-100 border border-primary-500 rounded-lg z-40 md:max-w-[20.9375rem]"
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedValue || "Selecione o tipo de transação"}
          <Image
            className={`ml-2 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
              }`}
            priority
            src="/images/icone-seta.svg"
            height={14}
            width={14}
            alt="Seta"
          />
        </button>
        {isOpen && (
          <ul className="absolute w-full bg-neutral-100 -mt-4 rounded-lg border border-primary-500 z-30 md:max-w-[20.9375rem]">
            <SelectOption value={transactionsNames[0]} onClick={handleSelect}>
            {transactionsNames[0]}
            </SelectOption>
            <SelectOption value={transactionsNames[1]} onClick={handleSelect}>
            {transactionsNames[1]}
            </SelectOption>
            <SelectOption
              value={transactionsNames[2]}
              onClick={handleSelect}
            >
              {transactionsNames[2]}
            </SelectOption>
          </ul>
        )}
        
      </div>
      {hasError && <p className="text-red-500 mt-2">Selecione um tipo de transação.</p>}

      <TransactionInput
        className="z-20"
        label="Valor da Transação"
        value={transactionValue}
        onChange={handleChange}
      />
      {isValueRequired && (
        <p className="text-red-500 text-sm mt-1">
          Este campo é obrigatório.
        </p>
      )}

      <AttachmentUploader onFileSelect={handleFileSelect} />

      <div className="mt-8">
        <Button className="max-w-[9rem] md:max-w-[15.625rem] md:w-full relative z-20" text="Concluir transação" onClick={handleClick} />
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
