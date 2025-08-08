import { CursoListaComponent } from './lista/curso-lista.component';
import { Routes } from '@angular/router';
import { CursoFormComponent } from './curso-form/curso-form.component';

export const cursosRoutes: Routes = [
  {
    path: 'novo',
    component: CursoFormComponent,
  },
  {
    path: 'editar/:id',
    component: CursoFormComponent,
  },
  {
    path: ':id',
    component: CursoFormComponent,
  },
  {
    path: '',
    component: CursoListaComponent,
  },
];
