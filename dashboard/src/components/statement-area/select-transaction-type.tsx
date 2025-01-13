import React from "react";

interface SelectTypeTransactionProps {
    label: string;
    value: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectTypeTransaction: React.FC<SelectTypeTransactionProps> = ({
    label,
    value,
    className,
    onChange,
}) => {
    return (
<div className={`flex flex-col items-center gap-4 w-full md:items-start ${className}`}>
  <label
    className="font-inter font-semibold text-sm text-tertiary-300 text-center md:text-left"
    htmlFor="selectType"
  >
    {label}
  </label>
  <select
    id="selectType"
    className="max-w-[9rem] flex justify-between items-center text-left text-sm p-3 bg-neutral-100 border border-primary-500 rounded-lg focus:outline focus:outline-offset-2 focus:outline-primary-500 md:max-w-[15.625rem] md:w-full"
    value={value}
    onChange={onChange}
    placeholder="Selecione"
  >
    <option value="" disabled hidden>
      Escolha o tipo
    </option>
    <option value="Câmbio de Moeda">Câmbio de Moeda</option>
    <option value="DOC/TED">DOC/TED</option>
    <option value="Empréstimo e Financiamento">Empréstimo e Financiamento</option>
  </select>
</div>
    );
};

export default SelectTypeTransaction;
