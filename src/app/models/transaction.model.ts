export class Transaction {
    id: number;
    category_id: number;
    amount: number;
    type: TransactionType;
}

export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE'
}