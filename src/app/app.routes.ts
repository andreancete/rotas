import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ContatoComponent } from './contato/contato.component';
import { UsuariosComponent } from './usuarios/usuarios.lista.component/usuarios.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { LoginComponent } from './login/login-component/login.component';
import { AuthGuard } from './guard/auth.guard';
import { SairComponent } from './login/logout-component/logout.component';
import { UsuariosGuard } from './guard/usuarios.guard';
import { usuariosRoutes } from './usuarios/usuarios.routes';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sobre',
    component: SobreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contato',
    component: ContatoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    canActivateChild: [UsuariosGuard],
    children: usuariosRoutes,
  },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sair',
    component: SairComponent,
    canActivate: [AuthGuard],
  },
  // As rotas abaixo estão comentadas pois não possuem component, loadComponent, redirectTo, children ou loadChildren
  // Para evitar erro NG04014, só adicione rotas válidas
];
