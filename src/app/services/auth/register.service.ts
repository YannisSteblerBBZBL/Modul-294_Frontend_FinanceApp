import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:9090/api/users';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<object> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<object>(this.apiUrl, payload, { headers });
  }
}
