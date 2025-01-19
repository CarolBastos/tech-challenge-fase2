import React from "react";

interface DateInputProps {
    label: string;
    value: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({
    label,
    value,
    className,
    onChange
}) => {
    const today = new Date().toISOString().split('T')[0];
    return (
        <div className={`flex flex-col items-center gap-4 w-full md:items-start ${className}`}>
            <label
                className="font-inter font-semibold text-sm text-tertiary-300 text-center md:text-left"
                htmlFor="transactionDate"
            >
                {label}
            </label>
            <input
                id="transactionDate"
                type="date"
                className="max-w-[9rem] flex justify-between items-center text-left text-sm p-3 bg-neutrl-100 border border-primary-500 rounded-lg focus:outline focus:outline-offset-2 focus:outline-primary-500 md:max-w-[15.625rem] md:w-full"
                value={value}
                onChange={onChange}
                max={today}
            />
        </div>
    );
};

export default DateInput;
