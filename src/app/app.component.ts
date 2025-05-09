import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeModeService } from './core/services/theme-mode.service';
import { KeycloakService } from './services/auth/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Web-Boxx';

  constructor(private themeModeService: ThemeModeService) {}
  private keycloakService = inject(KeycloakService);
  loading = true;
  
  async ngOnInit(): Promise<void> {
    try {
      await this.keycloakService.init();
      console.log('Keycloak initialized successfully');
    } catch (error) {
      console.error('Error initializing Keycloak', error);
    } finally {
      this.loading = false;
    }
  }
}
