import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../../../services/auth/register.service';
import { KeycloakService } from '../../../../services/auth/keycloak.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: RegisterService,
    private keycloakService: KeycloakService
  ) {}

  onRegister() {
    this.errorMessage = '';

    if (!this.username.trim() || !this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        if (response?.success) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = response?.message || 'Registration failed. Please try again.';
        }
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'An unexpected error occurred. Please try again.';
      }
    });
  }
}
