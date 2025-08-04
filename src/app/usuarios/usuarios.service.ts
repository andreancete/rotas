import { Usuario } from './usuario.interface';
import { Injectable } from '@angular/core';
import { USUARIOS_MOCK } from './mock/usuarios.mock';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usuarios: Usuario[] = [...USUARIOS_MOCK];

  getUsuarios(): Usuario[] {
    return [...this.usuarios];
  }

  // Método para retornar um usuário vazio
  usuarioVazio(): Usuario {
    return {
      id: 0,
      nome: '',
      email: '',
      senha: '',
      fotourl: '',
      endereco: {
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
      },
    };
  }

  getUsuarioById(id: number): Usuario | undefined {
    return this.usuarios.find((u) => u.id === id);
  }

  adicionarUsuario(usuario: Omit<Usuario, 'id'>): Usuario {
    const novo: Usuario = {
      ...usuario,
      id:
        this.usuarios.length > 0
          ? Math.max(...this.usuarios.map((u) => u.id)) + 1
          : 1,
    };
    this.usuarios.push(novo);
    return novo;
  }

  atualizarUsuario(id: number, usuario: Partial<Omit<Usuario, 'id'>>): boolean {
    const idx = this.usuarios.findIndex((u) => u.id === id);
    if (idx === -1) return false;
    this.usuarios[idx] = { ...this.usuarios[idx], ...usuario };
    return true;
  }

  removerUsuario(id: number): boolean {
    const idx = this.usuarios.findIndex((u) => u.id === id);
    if (idx === -1) return false;
    const confirmacao = window.confirm(
      'Tem certeza que deseja remover este usuário?'
    );
    if (!confirmacao) return false;
    this.usuarios.splice(idx, 1);
    return true;
  }
}
