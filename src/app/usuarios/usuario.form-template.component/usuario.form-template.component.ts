import { Component, input, OnInit } from '@angular/core';
import { Usuario } from '../usuario.interface';
import { UsuariosService } from '../usuarios.service';
import { EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanComponentDeactivate } from '../../guard/canComponentDeactivate.Interface';

@Component({
  selector: 'app-usuario.form-template.component',
  imports: [],
  templateUrl: './usuario.form-template.component.html',
  styleUrl: './usuario.form-template.component.css',
})
export class UsuarioFormTemplateComponent
  implements OnInit, CanComponentDeactivate
{
  @Output() usuarioRefresh = new EventEmitter<void>();
  @input() usuarioSelecionado?: Usuario;

  refreshUsuarios() {
    this.usuarioRefresh.emit();
  }
  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    // Inicialização do componente
  }

  adicionarUsuarioForm(usuarioForm: any) {
    if (usuarioForm.valid) {
      const usuario: Omit<Usuario, 'id'> = {
        nome: usuarioForm.value.nome,
        email: usuarioForm.value.email,
        senha: usuarioForm.value.senha,
        fotourl: usuarioForm.value.fotourl,
      };
      this.adicionarUsuario(usuario);
      usuarioForm.reset(); // Limpar o formulário após adicionar
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  s;

  adicionarUsuario(usuario: Omit<Usuario, 'id'>) {
    this.usuariosService.adicionarUsuario(usuario);
    this.refreshUsuarios(); // Emitir evento para atualizar a lista de usuários
  }

  atualizarUsuario(id: number, usuario: Partial<Omit<Usuario, 'id'>>) {
    this.usuariosService.atualizarUsuario(id, usuario);
    this.refreshUsuarios(); // Emitir evento para atualizar a lista de usuários
  }

  removerUsuario(id: number) {
    this.usuariosService.removerUsuario(id);
    this.refreshUsuarios(); // Emitir evento para atualizar a lista de usuários
  }

  podeDesativar(): boolean {
    // Implementar lógica para verificar se o componente pode ser desativado
    // Por exemplo, verificar se há alterações não salvas
    return true;
  }
}
