import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget.model';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    private baseURL = 'http://localhost:9090';
    private apiUrl = '/api/budgets';

    constructor(private http: HttpClient) {}

    getAllBudgets(): Observable<Budget[]> {
        return this.http.get<Budget[]>(`${this.baseURL}${this.apiUrl}`);
    }

    getBudgetById(id: number): Observable<Budget> {
        return this.http.get<Budget>(`${this.baseURL}${this.apiUrl}/${id}`);
    }

    createBudget(budget: Budget): Observable<Budget> {
        return this.http.post<Budget>(`${this.baseURL}${this.apiUrl}`, budget);
    }

    updateBudget(id: number, budget: Budget): Observable<Budget> {
        return this.http.put<Budget>(`${this.baseURL}${this.apiUrl}/${id}`, budget);
    }

    deleteBudget(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}${this.apiUrl}/${id}`);
    }
}