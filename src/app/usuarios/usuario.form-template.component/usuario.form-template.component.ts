import {
  Component,
  input,
  OnInit,
  provideZoneChangeDetection,
} from '@angular/core';
import { Usuario } from '../usuario.interface';
import { UsuariosService } from '../usuarios.service';
import { EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanComponentDeactivate } from '../../guard/canComponentDeactivate.Interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { idLocale } from 'ngx-bootstrap/chronos';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-usuario.form-template.component',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuario.form-template.component.html',
  styleUrl: './usuario.form-template.component.css',
})
export class UsuarioFormTemplateComponent
  implements OnInit, CanComponentDeactivate
{
  @Output() usuarioRefresh = new EventEmitter<void>();
  usuario: Usuario;

  refreshUsuarios() {
    this.usuarioRefresh.emit();
  }
  constructor(
    private usuariosService: UsuariosService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.usuario = this.usuariosService.usuarioVazio();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if (id) {
        let usu = this.usuariosService.getUsuarioById(id);
        if (!usu) {
          this.usuario = this.usuariosService.usuarioVazio();
          console.warn(
            'Usuário não encontrado, inicializando com valores padrão.'
          );
        } else {
          this.usuario = usu;
          // console.log('Usuário carregado:', this.usuario);
        }
      }
    });
  }

  consultarCep(cep: string, form: any) {
    cep = cep.replace(/\D/g, '');
    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json`).subscribe({
      next: (data) => this.populaCamposEndereco(data, form),
      error: (error) => {
        this.usuario.endereco = {
          cep: '',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          uf: '',
        };
        console.error('Erro ao consultar o CEP:', error);
      },
    });
  }

  populaCamposEndereco(data: any, formulario: any) {
    if (!data.erro) {
      // formulario.forms.pathvalue = {
      //   cep: data.cep || '',
      //   rua: data.logradouro || '',
      //   bairro: data.bairro || '',
      //   cidade: data.localidade || '',
      //   uf: data.uf || '',
      // };
      formulario.controls['cep'].setValue(data.cep || '');
      formulario.controls['rua'].setValue(data.logradouro || '');
      formulario.controls['bairro'].setValue(data.bairro || '');
      formulario.controls['cidade'].setValue(data.localidade || '');
      formulario.controls['uf'].setValue(data.uf || '');
    } else {
      formulario.controls['cep'].setValue(null);
      formulario.controls['rua'].setValue(null);
      formulario.controls['bairro'].setValue(null);
      formulario.controls['cidade'].setValue(null);
      formulario.controls['uf'].setValue(null);
      console.warn('CEP não encontrado, preenchendo com valores vazios.');
    }
  }

  adicionarUsuarioForm(usuarioForm: any) {
    if (usuarioForm.valid) {
      const usuario: Omit<Usuario, 'id'> = {
        nome: usuarioForm.value.nome,
        email: usuarioForm.value.email,
        senha: usuarioForm.value.senha,
        fotourl: usuarioForm.value.fotourl,
        // Adicione outros campos necessários aqui
        endereco: {
          cep: '',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          uf: '',
        },
      };
      if (this.usuario) {
        this.usuariosService.atualizarUsuario(this.usuario.id, usuario);
      } else {
        this.usuariosService.adicionarUsuario(usuario);
      }
      this.refreshUsuarios(); // Emitir evento para atualizar a lista de usuários
      usuarioForm.reset(); // Limpar o formulário após adicionar ou atualizar
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
  limparForm(form: any) {
    // this.usuario = null; // Limpar o usuário atual
    form.reset(); // Limpar o formulário
  }

  adicionarUsuario(usuario: Omit<Usuario, 'id'>) {
    this.usuariosService.adicionarUsuario(usuario);
    this.refreshUsuarios(); // Emitir evento para atualizar a lista de usuários
  }

  atualizarUsuario(id: number, usuario: Partial<Omit<Usuario, 'id'>>) {
    this.usuariosService.atualizarUsuario(id, usuario);
    this.refreshUsuarios(); // Emitir evento para atualizar a lista de usuários
  }

  removerUsuario(id: number) {
    this.usuariosService.removerUsuario(id);
    this.refreshUsuarios(); // Emitir evento para atualizar a lista de usuários
  }

  podeDesativar(): boolean {
    // Implementar lógica para verificar se o componente pode ser desativado
    // Por exemplo, verificar se há alterações não salvas
    return true;
  }
}
