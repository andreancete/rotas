import { Endereco } from './endereco.interface';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  fotourl: string;
  endereco: Endereco;
}
