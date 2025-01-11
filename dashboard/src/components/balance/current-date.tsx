import React from 'react';

const CurrentDate: React.FC = () => {
    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        
        const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date);
        const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        
        return capitalizedDate;
    };

    const currentDate = new Date();

    return (
        <p className="text-[13px] font-normal text-left">{formatDate(currentDate)}</p>
    );
};

export default CurrentDate;
