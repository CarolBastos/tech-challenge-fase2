import React, { useState } from "react";

interface TransactionInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TransactionInput: React.FC<TransactionInputProps> = ({
  label,
  value,
  onChange,
  className
}) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^\d]/g, '');

    if (inputValue.length > 2) {
      const integerPart = inputValue.slice(0, -2);
      const decimalPart = inputValue.slice(-2);
      inputValue = `${parseInt(integerPart, 10)},${decimalPart}`;
    } else if (inputValue.length === 2) {
      inputValue = `0,${inputValue}`;
    } else if (inputValue.length === 1) {
      inputValue = `0,0${inputValue}`;
    }

    const formattedEvent = {
      ...event,
      target: {
        ...event.target,
        value: inputValue,
      },
    };

    onChange(formattedEvent as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={`flex flex-col items-center gap-4 w-full md:items-start ${className}`}>
      <label
        className="font-inter font-semibold text-sm text-tertiary-300 text-center md:text-left"
        htmlFor="transactionValue"
      >
        {label}
      </label>
      <input
        id="transactionValue"
        type="text"
        className="max-w-[9rem] flex justify-between items-center text-left text-sm p-3 abg-neutrl-100 border border-primary-500 rounded-lg focus:outline focus:outline-offset focus:outline-2 focus:outline-primary-500 md:max-w-[15.625rem] md:w-full"
        value={value}
        onChange={handleInputChange}
        placeholder="00,00"
      />
    </div>
  );
};

export default TransactionInput;
