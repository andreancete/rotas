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
  // {
  //     path: ':id',
  //     component: UsuarioDetalheComponent
  // },
  // {
  //     path: ':id/editar',
  //     component: UsuarioFormComponent
  // }
];
