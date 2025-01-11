interface ITransactionCard {
    month: string;
    date: string;
    transactionType: string;
    transactionValue: number;
}

export const TransactionCard = ({
    month,
    date,
    transactionType,
    transactionValue
}: ITransactionCard) => (
    <div className="flex flex-col gap-2 pb-2 border-[0.5px] border-transparent border-b-green-600">
        <span className="font-bold text-green-600">{month}</span>
        <div className="flex items-center justify-between">
            <span>{transactionType}</span>
            <span className="text-xs text-zinc-500">{date}</span>
        </div>
        <span className="font-bold">
            R$ {transactionValue}
        </span>
    </div>
)