import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseURL = 'http://localhost:9090';
    private apiUrl = `/api/users`;

    constructor(private http: HttpClient) {}

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseURL}${this.apiUrl}`);
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseURL}${this.apiUrl}/${id}`);
    }

    updateUser(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.baseURL}${this.apiUrl}/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}${this.apiUrl}/${id}`);
    }
}