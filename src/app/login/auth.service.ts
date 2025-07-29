import Usuario from './usuarioLogado.interface';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario: Usuario;
  private usuarioLogado: boolean = false;

  mostrarMenuEmit = new EventEmitter<boolean>();

  constructor(private router: Router) {
    this.usuario = { email: '', senha: '' }; // Initialize with default values
  }

  login(_usuario: Usuario): boolean {
    this.mostrarMenuEmit.emit(false); // Emit event to show menu
    if (!_usuario.email || !_usuario.senha) {
      return false; // Invalid credentials
    }
    if (_usuario.email !== 'a' || _usuario.senha !== '123') {
      this.usuarioLogado = false;
      throw new Error('Invalid credentials'); // Invalid credentials
    }

    this.mostrarMenuEmit.emit(true); // Emit event to show menu
    this.usuarioLogado = true;
    this.usuario = _usuario; // Store the user information
    console.log('Usuário logado com sucesso!');
    // Redirecionar para a pagina home ou outra ação
    this.router.navigate(['/home']);
    // Exibir mensagem de erro ou realizar outras ações em caso de falha no login
    return true; // Placeholder for successful login
  }

  usuarioEstaLogado(): boolean {
    return this.usuarioLogado;
  }

  logout(): void {
    this.usuarioLogado = false;
    this.mostrarMenuEmit.emit(false); //evento para esconder o menu
    this.router.navigate(['/home']); // Redirecionar para a página inicial após logout
  }
}
