import { UsuarioFormTemplateComponent } from './usuario.form-template.component/usuario.form-template.component';
import { Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.lista.component/usuarios.component';

export const usuariosRoutes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
  },
  // {
  //     path: 'novo',
  //     component: UsuarioFormComponent
  // },
  {
    path: ':id',
    component: UsuarioFormTemplateComponent,
  },
  // {
  //     path: ':id/editar',
  //     component: UsuarioFormComponent
  // }
];
