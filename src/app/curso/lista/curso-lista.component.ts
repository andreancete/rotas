import { Component } from '@angular/core';
import { CursoService } from '../service/cursos.service';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { Curso } from '../curso.model';
import { catchError, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MensagemService } from '../../shared/mensagem/mensagem.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-curso.component',
  imports: [CommonModule, RouterModule],
  templateUrl: './curso-lista.component.html',
  styleUrl: './curso-lista.component.css',
  preserveWhitespaces: true,
})
export class CursoListaComponent {
  // cursos$!: Observable<Curso[]>;
  cursos: Curso[] = [];
  cursoSelecionado: Curso | null = null;

  constructor(
    private cursoService: CursoService,
    private mensagem: MensagemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.cursos = this.cursoService.getCursos();
    // Usando o serviço para obter os cursos como um Observable
    // e atribuindo à variável cursos$  e utili
    // this.cursos$ = this.cursoService.getCursos().pipe(
    //   catchError((error) => {
    //     console.error('Erro ao carregar cursos:', error);
    //     this.mensagem.erro('Ocorreu um erro ao carregar os cursos.');
    //     return of([]);
    //   })
    // );

    // Usando o serviço para obter os cursos como um Observable
    // e atribuindo à variável cursos$  e utilizando
    // utilizando o take para limitar a um único valor emitido e depois completando o Observable
    this.cursoService
      .getCursos()
      .pipe(
        tap(() => {
          console.log('Cursos carregados com sucesso');
        }),
        catchError((error) => {
          console.error('Erro ao carregar cursos:', error);
          this.mensagem.erro('Ocorreu um erro ao carregar os cursos.');
          return of([] as Curso[]); // Retorna um array vazio em caso de erro, tipado corretamente
        }),
        take(1) // Limita a um único valor emitido
      )
      .subscribe((cursos: Curso[]) => {
        this.cursos = cursos;
      });
  }

  selecionarCurso(cursoId: number): void {
    this.cursoSelecionado = this.cursos.find((c) => c.id === cursoId) || null;
  }

  novoCurso(): void {
    // Implementar lógica para criar um novo curso
    console.log('Criando novo curso');
  }

  visualizarCurso(cursoId: number): void {
    this.router.navigate(['/cursos', cursoId]);
    // Implementar lógica para visualizar detalhes do curso
    console.log(`Visualizando curso com ID: ${cursoId}`);
  }

  editarCurso(cursoId: number): void {
    this.router.navigate(['/cursos', 'editar', cursoId]);
    // Implementar lógica para editar o curso
    console.log(`Editando curso com ID: ${cursoId}`);
  }

  deletarCurso(cursoId: number): void {
    // Implementar lógica para deletar o curso
    if (!confirm('Tem certeza que deseja deletar este curso?')) {
      return;
    }

    this.cursoService
      .deletarCurso(cursoId)
      .pipe(
        catchError((error) => {
          console.error('Erro ao deletar curso: ', error);
          return of([] as Curso[]); // Retorna um array vazio em caso de erro
        }),
        tap(() => {
          console.log('Curso excluído com sucesso');
        }),
        take(1) // Limita a um único valor emitido
      )
      .subscribe((curso) => {
        this.cursos = this.cursos.filter((curso) => curso.id !== cursoId);
      });
  }
}
