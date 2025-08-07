import { Component } from '@angular/core';
import { CursoService } from '../service/cursos.service';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { Curso } from '../curso.model';
import { catchError, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-curso.component',
  imports: [CommonModule],
  templateUrl: './curso-lista.component.html',
  styleUrl: './curso-lista.component.css',
  preserveWhitespaces: true,
})
export class CursoListaComponent {
  cursos$!: Observable<Curso[]>;
  cursos: Curso[] = [];
  cursoSelecionado: Curso | null = null;

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    // this.cursos = this.cursoService.getCursos();
    // Usando o serviço para obter os cursos como um Observable
    // e atribuindo à variável cursos$  e utili
    this.cursos$ = this.cursoService.getCursos().pipe(
      catchError((error) => {
        console.error('Erro ao carregar cursos:', error);
        return of([]);
      })
    );
    // Usando o serviço para obter os cursos como um Observable
    // e atribuindo à variável cursos$  e utilizando
    // utilizando o take para limitar a um único valor emitido e depois completando o Observable
    // this.cursoService
    //   .getCursos()
    //   .pipe(
    //     catchError((error) => {
    //       console.error('Erro ao carregar cursos:', error);
    //       return of([]); // Retorna um array vazio em caso de erro
    //     }),
    //     tap(() => {
    //       console.log('Cursos carregados com sucesso');
    //     }),
    //     take(1) // Limita a um único valor emitido
    //   )
    //   .subscribe((cursos) => {
    //     this.cursos = cursos;
    //   });
  }

  selecionarCurso(cursoId: number): void {
    this.cursoSelecionado = this.cursos.find((c) => c.id === cursoId) || null;
  }

  novoCurso(): void {
    // Implementar lógica para criar um novo curso
    console.log('Criando novo curso');
  }

  visualizarCurso(cursoId: number): void {
    // Implementar lógica para visualizar detalhes do curso
    console.log(`Visualizando curso com ID: ${cursoId}`);
  }

  editarCurso(cursoId: number): void {
    // Implementar lógica para editar o curso
    console.log(`Editando curso com ID: ${cursoId}`);
  }

  deletarCurso(cursoId: number): void {
    // Implementar lógica para deletar o curso
    console.log(`Deletando curso com ID: ${cursoId}`);
  }
}
