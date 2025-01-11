import React from "react";

interface DynamicButtonProps {
  backgroundColor?: string;
  text: string;
  onClick?: () => void;
  className?: string; 
}

const Button: React.FC<DynamicButtonProps> = ({
  backgroundColor = "bg-primary-500",
  text,
  onClick,
  className
}) => {
  return (
      <button
        onClick={onClick}
        className={`${backgroundColor} ${className} flex items-center justify-center bg-primary-500 font-inter font-semibold text-white text-sm button-default px-3 rounded-lg md:p-3`}
      >
        {text}
      </button>
  );
};

export default Button;
