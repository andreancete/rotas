import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.interface';
import { UsuariosService } from '../usuarios.service';
import { CommonModule } from '@angular/common';
import { CanComponentDeactivate } from '../../guard/canComponentDeactivate.Interface';
import { UsuarioFormTemplateComponent } from '../usuario.form-template.component/usuario.form-template.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios.component',
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit, CanComponentDeactivate {
  [x: string]: any;
  usuarios: Usuario[] = [];
  usuarioSelecionado?: Usuario;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

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
    //redireciona para a rota de usuario/id
    this.router.navigate(['/usuarios', id]);
  }

  visualizarUsuarioReativo(id: number) {
    this.usuarioSelecionado = this.usuariosService.getUsuarioById(id);
    //redireciona para a rota de usuario/id
    this.router.navigate(['/usuarios/reativo', id]);
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
