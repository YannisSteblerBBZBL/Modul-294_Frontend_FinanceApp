import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private baseURL = 'http://localhost:9090';
    private apiUrl = '/api/categories';

    constructor(private http: HttpClient) {}

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseURL}${this.apiUrl}`);
    }

    getCategoryById(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.baseURL}${this.apiUrl}/${id}`);
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(`${this.baseURL}${this.apiUrl}`, category);
    }

    updateCategory(id: number, category: Category): Observable<Category> {
        return this.http.put<Category>(`${this.baseURL}${this.apiUrl}/${id}`, category);
    }

    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}${this.apiUrl}/${id}`);
    }
}