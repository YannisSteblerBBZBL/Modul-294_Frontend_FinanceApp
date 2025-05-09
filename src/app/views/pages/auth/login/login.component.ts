import { NgIf, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KeycloakService } from '../../../../services/auth/keycloak.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private keycloakService = inject(KeycloakService);
  private router = inject(Router);

  ngOnInit(): void {
    // If already authenticated, redirect to dashboard
    this.keycloakService.isAuthenticated().subscribe(authenticated => {
      if (authenticated) {
        this.router.navigate(['/home']);
      }
    });
  }

  login(): void {
    this.keycloakService.login();
  }

}
