export class Transaction {
    category_id!: number;
    amount!: number;
    type!: TransactionType;
}

export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE'
}