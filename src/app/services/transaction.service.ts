import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private baseURL = 'http://localhost:9090';
    private apiUrl = '/api/transactions';

    constructor(private http: HttpClient) {}

    getAllTransactions(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.baseURL}${this.apiUrl}`);
    }

    getTransactionById(id: number): Observable<Transaction> {
        return this.http.get<Transaction>(`${this.baseURL}${this.apiUrl}/${id}`);
    }

    createTransaction(transactionDTO: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(`${this.baseURL}${this.apiUrl}`, transactionDTO);
    }

    updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
        return this.http.put<Transaction>(`${this.baseURL}${this.apiUrl}/${id}`, transaction);
    }

    deleteTransaction(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}${this.apiUrl}/${id}`);
    }
}