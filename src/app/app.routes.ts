import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { ContatoComponent } from './contato/contato.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sobre',
    component: SobreComponent,
  },
  {
    path: 'contato',
    component: ContatoComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: 'login', component: LoginComponent },
  // As rotas abaixo estão comentadas pois não possuem component, loadComponent, redirectTo, children ou loadChildren
  // Para evitar erro NG04014, só adicione rotas válidas
];
