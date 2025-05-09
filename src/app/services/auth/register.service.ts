import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:9090/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}`,
      { username, email, password },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
    
}