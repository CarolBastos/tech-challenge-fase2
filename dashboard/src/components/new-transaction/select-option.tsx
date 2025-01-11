import React from 'react';

interface SelectOptionProps {
  value: string;
  onClick: (value: string) => void;
  children: React.ReactNode;
}

const SelectOption: React.FC<SelectOptionProps> = ({ value, onClick, children }) => (
  <li className="select-option">
    <button
      className={`w-full text-sm text-neutral-400 p-6 hover:bg-tertiary-300 hover:font-bold`}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  </li>
);

export default SelectOption;
