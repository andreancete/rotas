import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { LoginComponent } from './login/login-component/login.component';
import { AuthGuard } from './guard/auth.guard';
import { SairComponent } from './login/logout-component/logout.component';
import { UsuariosGuard } from './guard/usuarios.guard';
import { usuariosRoutes } from './usuarios/usuarios.routes';
import { cursosRoutes } from './curso/cursos.routes';

export const routes: Routes = [
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
    path: 'cursos',
    canActivate: [AuthGuard],
    // canActivateChild: [UsuariosGuard],
    children: cursosRoutes, // Assuming cursosRoutes is imported from the cursos.routes file
  },
  // {
  //   path: 'curso',
  //   component: CursoListaComponent,
  //   canActivate: [AuthGuard],
  // },
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
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home', // Redirect to home if no path is specified
    // component: HomeComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  },

  // As rotas abaixo estão comentadas pois não possuem component, loadComponent, redirectTo, children ou loadChildren
  // Para evitar erro NG04014, só adicione rotas válidas
];
