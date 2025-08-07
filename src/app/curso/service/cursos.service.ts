import { Injectable, OnInit } from '@angular/core';
import { Curso } from '../curso.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private cursos: Curso[] = [];
  private url = `${environment.backendUrl}`;
  private cursosEndpoint = `${this.url}/cursos`;

  constructor(private http: HttpClient) {}

  getCursos() {
    // Fazendo requisição HTTP para obter cursos do backend
    // (Necessário importar HttpClient e injetar no construtor)
    console.log('URL de cursos:', this.cursosEndpoint);
    return this.http.get<Curso[]>(this.cursosEndpoint).pipe(
      // delay(2000), // Simula um atraso de 1 segundo
      tap((cursos) => {
        this.cursos = cursos;
        console.log('Cursos carregados:', this.cursos);
      })
    );
  }

  getCursoById(id: number) {
    return this.http.get<Curso>(`${this.cursosEndpoint}/${id}`);
  }

  adicionarCurso(curso: Omit<(typeof this.cursos)[0], 'id'>) {
    return this.http.post<Curso>(`${this.cursosEndpoint}`, curso);
  }

  atualizarCurso(
    id: number,
    curso: Partial<Omit<(typeof this.cursos)[0], 'id'>>
  ) {
    return this.http.put<Curso>(`${this.cursosEndpoint}/${id}`, curso);
  }
}
