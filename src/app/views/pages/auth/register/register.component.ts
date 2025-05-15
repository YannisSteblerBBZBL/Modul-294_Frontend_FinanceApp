import { Component, inject } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { RegisterService } from '../../../../services/auth/register.service';
import { KeycloakService } from '../../../../services/auth/keycloak.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  errorMessage: string = '';

  private router = inject(Router);
  private authService = inject(RegisterService);
  private keycloakService = inject(KeycloakService);

  onRegister(): void {
    this.errorMessage = '';

    if (!this.username.trim() || !this.email.trim() || !this.password.trim() ||
        !this.firstName.trim() || !this.lastName.trim()) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const userPayload = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    };

    this.authService.register(userPayload).subscribe({
      next: () => {
      this.router.navigate(['/auth/login']);
      },
      error: (err) => {
      this.errorMessage = err?.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
