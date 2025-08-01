import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.interface';
import { UsuariosService } from '../usuarios.service';
import { CommonModule } from '@angular/common';
import { CanComponentDeactivate } from '../../guard/canComponentDeactivate.Interface';
import { UsuarioFormTemplateComponent } from '../usuario.form-template.component/usuario.form-template.component';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-usuarios.component',
  imports: [CommonModule, UsuarioFormTemplateComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit, CanComponentDeactivate {
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

  visualizarUsuario(id: number) {
    this.usuarioSelecionado = this.usuariosService.getUsuarioById(id);
  }

  // Handler for refresh event from UsuarioFormTemplateComponent
  onUsuarioRefresh() {
    this.carregarUsuarios();
  }

  podeDesativar(): boolean {
    // Implementar lógica para verificar se o componente pode ser desativado
    // Por exemplo, verificar se há alterações não salvas
    return true;
  }
}
