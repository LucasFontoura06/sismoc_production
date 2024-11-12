import { Timestamp } from 'firebase/firestore';

export class Usuario {
  id: string;
  nome: string;
  ativo: boolean;
  setor: string;
  perfil: {
    id: string;
    descricao: string;
  };
  email: string;
  senha: string;
  dataCadastro: Timestamp;

  constructor(
    id: string,
    nome: string,
    ativo: boolean,
    setor: string,
    perfil: { id: string; descricao: string; },
    email: string,
    senha: string,
    dataCadastro: Timestamp,
  ) {
    this.id = id;
    this.nome = nome;
    this.ativo = ativo;
    this.setor = setor;
    this.perfil = perfil;
    this.email = email;
    this.senha = senha;
    this.dataCadastro = dataCadastro;
  }
}