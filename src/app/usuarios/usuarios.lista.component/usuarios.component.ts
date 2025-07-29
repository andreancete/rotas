import { Component } from '@angular/core';
import { Usuario } from '../usuario.interface';
import { UsuariosService } from '../usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios.component',
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  usuarioSelecionado?: Usuario;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarios = this.usuariosService.getUsuarios();
  }

  selecionarUsuario(id: number) {
    this.usuarioSelecionado = this.usuariosService.getUsuarioById(id);
  }

  adicionarUsuario(usuario: Omit<Usuario, 'id'>) {
    this.usuariosService.adicionarUsuario(usuario);
    this.carregarUsuarios();
  }

  atualizarUsuario(id: number, usuario: Partial<Omit<Usuario, 'id'>>) {
    this.usuariosService.atualizarUsuario(id, usuario);
    this.carregarUsuarios();
  }

  removerUsuario(id: number) {
    this.usuariosService.removerUsuario(id);
    this.carregarUsuarios();
  }
}
