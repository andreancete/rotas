import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class MensagemService {
  constructor(private toastr: ToastrService) {}

  sucesso(mensagem: string, titulo?: string) {
    this.toastr.success(mensagem, titulo);
  }

  erro(mensagem: string, titulo?: string) {
    this.toastr.error(mensagem, titulo);
  }

  info(mensagem: string, titulo?: string) {
    this.toastr.info(mensagem, titulo);
  }

  alerta(mensagem: string, titulo?: string) {
    this.toastr.warning(mensagem, titulo);
  }

  pergunta(mensagem: string, titulo?: string) {
    // ngx-toastr não tem modal de pergunta, use um dialog/modal para isso
  }
}
