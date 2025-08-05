import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../usuario.interface';
import { UsuariosService } from '../usuarios.service';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private http: HttpClient
  ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      fotourl: [''],
      endereco: this.fb.group({
        cep: [''],
        rua: [''],
        numero: [''],
        bairro: [''],
        cidade: [''],
        uf: [''],
      }),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        const usuario = this.usuariosService.getUsuarioById(id);
        if (usuario) {
          this.formulario.patchValue(usuario);
          this.visualizando = true;
          this.usuarioId = usuario.id;
          this.formulario.disable();
        } else {
          this.formulario.reset();
          this.visualizando = false;
        }
      } else {
        this.formulario.reset();
        this.visualizando = false;
      }
    });
  }

  habilitarEdicao() {
    this.formulario.enable();
    this.visualizando = false;
  }

  salvar() {
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
      this.visualizando = false;
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
}
