import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../usuario.interface';
import { UsuariosService } from '../usuarios.service';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { EstadosService } from '../../shared/combo/estados.service';

@Component({
  selector: 'app-usuario.form-reative.component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './usuario.form-reative.component.html',
  styleUrl: './usuario.form-reative.component.css',
})
export class UsuarioFormReativeComponent implements OnInit {
  formulario: FormGroup;
  visualizando: boolean = true;
  usuarioId?: number;
  usuarioIdParametro?: number;
  estados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private http: HttpClient,
    // private EstadosService: EstadosService,
    private estadosService: EstadosService
  ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      fotourl: [''],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.estados = this.getEstados();
    this.route.paramMap.subscribe((params) => {
      this.carregarUsuario(+params.get('id')!);
      this.usuarioIdParametro = +params.get('id')!;

      console.log(
        'OnInit Params id: ',
        this.usuarioIdParametro !== null
          ? +this.usuarioIdParametro
          : 'Parâmetro não encontrado'
      );
    });
  }

  carregarUsuario(id: number) {
    // id = Number(params.get('id'));
    if (id) {
      const usuario = this.usuariosService.getUsuarioById(id);
      if (usuario) {
        console.log('Carregando usuário:', usuario);
        this.formulario.patchValue(usuario);
        this.visualizando = true;
        this.usuarioId = usuario.id;
        this.formulario.disable();
      } else {
        this.formulario.reset();
        this.visualizando = false;
      }
    } else {
      console.log('Reset formulario de usuario', id);
      this.formulario.reset();
      this.visualizando = false;
    }
  }

  habilitarEdicao() {
    this.carregarUsuario(this.usuarioIdParametro!);
    this.formulario.enable();
    this.visualizando = false;
  }

  ValidaCamposForm(formulario: FormGroup) {
    Object.keys(this.formulario.controls).forEach((campo) => {
      const controle = this.formulario.get(campo);
      if (controle && controle.invalid) {
        controle.markAsTouched();
        if (controle instanceof FormGroup) this.ValidaCamposForm(controle);
      }
    });
  }

  getEstados() {
    return this.estadosService.getEstados();
  }

  salvar() {
    //se o formulario for inválido mostra os campos inválidos
    if (this.formulario.invalid) {
      this.ValidaCamposForm(this.formulario);

      // Object.keys(this.formulario.controls).forEach((campo) => {
      //   const controle = this.formulario.get(campo);
      //   if (controle) {
      //     controle.markAsTouched();
      //   }
      // });
      return;
    }

    if (this.formulario.valid) {
      if (this.usuarioId) {
        this.usuariosService.atualizarUsuario(
          this.usuarioId,
          this.formulario.value
        );
      } else {
        this.usuariosService.adicionarUsuario(this.formulario.value);
      }
      this.formulario.reset();
      this.visualizando = true;
      this.usuarioId = undefined;
    }
  }

  novoUsuario() {
    this.formulario.reset();
    this.formulario.enable();
    this.visualizando = false;
    this.usuarioId = undefined;
  }

  validaDadosCampos(campo: any) {
    return this.formulario.get(campo)?.valid && !this.visualizando;
  }

  populaCamposEndereco(data: any) {
    if (!data.erro) {
      this.formulario.patchValue({
        endereco: {
          cep: data.cep || '',
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          uf: data.uf || '',
        },
      });
    } else {
      this.formulario.patchValue({
        endereco: {
          cep: '',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          uf: '',
        },
      });
    }
  }
  consultarCep() {
    let cep = this.formulario.get('endereco.cep')?.value;
    cep = cep.replace(/\D/g, '');
    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json`).subscribe({
      next: (data) => this.populaCamposEndereco(data),
      error: (error) => {
        this.formulario.patchValue({
          endereco: {
            cep: '',
            rua: '',
            numero: '',
            bairro: '',
            cidade: '',
            uf: '',
          },
        });
        console.error('Erro ao consultar o CEP:', error);
      },
    });
  }

  cancelarEdicao() {
    this.formulario.reset();
    this.visualizando = true;
    this.carregarUsuario(this.usuarioIdParametro!);
  }
}
