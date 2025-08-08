import { take } from 'rxjs/operators';
import { catchError } from 'rxjs';
import { Component } from '@angular/core';
import { Curso } from '../curso.model';
import { CursoService } from '../service/cursos.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MensagemService } from '../../shared/mensagem/mensagem.service';

enum FormModo {
  Visualizacao = 'visualizacao',
  Edicao = 'edicao',
  Insercao = 'insercao',
}

@Component({
  selector: 'app-curso-form.component',
  imports: [ReactiveFormsModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.css',
  preserveWhitespaces: true,
})
export class CursoFormComponent {
  curso: Curso | null = null;
  cursoForm!: FormGroup;
  formModo: FormModo = FormModo.Insercao;

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute,
    private mensagem: MensagemService,
    private fb: FormBuilder
  ) {}
  EnumFormModo = FormModo;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.url.map((segment) => segment.path);

    if (id && url.includes('editar')) {
      this.formModo = FormModo.Edicao;
    } else if (id) {
      this.formModo = FormModo.Visualizacao;
    } else {
      this.formModo = FormModo.Insercao;
    }

    // Lógica para inicializar o formulário
    this.cursoForm = this.fb.group({
      id: [this.curso?.id || null],
      nome: [
        this.curso?.nome || '',
        [Validators.required, Validators.minLength(3)],
      ],
      descricao: [
        this.curso?.descricao || '',
        [Validators.required, Validators.minLength(3)],
      ],
      duracao: [this.curso?.duracao || '', [Validators.required]],
    });

    if (this.formModo === FormModo.Visualizacao) {
      this.cursoForm.disable();
    } else {
      this.cursoForm.enable();
    }
    // Verifica se existe um parâmetro de rota 'id' para saber se está editando

    if (id) {
      // Carrega os dados do curso para edição
      this.carregaDados(id);
    }
  }

  carregaDados(id: string): void {
    this.cursoService
      .getCursoById(+id)
      .pipe(
        catchError((error) => {
          this.mensagem.erro(
            'Erro ao carregar dados do curso para alteração:' + error.message
          );
          console.error('Erro ao carregar curso:', error);
          return [];
        }),
        take(1)
      )
      .subscribe((curso) => {
        this.curso = curso;
        this.cursoForm.patchValue(curso);
      });
  }

  onSubmit(): void {
    if (this.cursoForm.invalid) {
      this.mensagem.erro('Formulário inválido. Verifique os campos.');
      return;
    }

    if (this.formModo === FormModo.Edicao) {
      if (this.curso) {
        this.cursoService
          .atualizarCurso(this.curso.id, this.cursoForm.value)
          .pipe(
            catchError((error) => {
              console.error('Erro ao atualizar curso:', error);
              return [];
            })
          )
          .pipe(take(1))
          .subscribe(() => {
            window.history.back();

            // this.router.navigate(['/cursos']);
          });
      }
    } else {
      // Lógica para criar um novo curso
      this.cursoService
        .adicionarCurso(this.cursoForm.value)
        .pipe(
          catchError((error) => {
            console.error('Erro ao criar curso:', error);
            return [];
          })
        )
        .pipe(take(1))
        .subscribe(() => {
          window.history.back();

          // this.router.navigate(['/cursos']);
        });
    }
  }

  onCancel(): void {
    window.history.back();
  }

  onReset(): void {
    this.curso = null;
    this.cursoForm.reset();
  }
}
