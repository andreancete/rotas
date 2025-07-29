import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sair.component',
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  imports: [],
})
export class SairComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  cancelar() {
    this.router.navigate(['/home']);
  }
}
