import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import Usuario from '../usuarioLogado.interface';

@Component({
  selector: 'app-login.component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public usuario: Usuario = new Usuario('', '');
  private usuarioLogado: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Initialization logic can go here
  }

  ngoninit() {
    // This method can be used for any initialization logic if needed
  }

  usuarioLogin() {
    // Exemplo de uso:
    if (this.usuario.email && this.usuario.senha) {
      this.usuarioLogado = this.authService.login(this.usuario);
      // Verifica se o login foi bem-sucedido
    }
  }
}
