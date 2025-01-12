interface Card {
    id: string;
    accountId: string;
    type: string;
    is_blocked: boolean;
    number: string;
    dueDate: string;
    functions: string;
    cvc: string;
    paymentDate: string | null;
    name: string;
}

interface Transaction {
    id: string;
    accountId: string;
    type: string;
    value: number;
    date: string;
}

interface Account {
    id: string;
    type: string;
    userId: string;
}

interface Result {
    account: Account[];
    transactions: Transaction[];
    cards: Card[];
}

export interface ResponseAccount {
    message: string;
    result: Result;
}
