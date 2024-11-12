import { Timestamp } from "firebase/firestore";

export class Parceiro {
    private id: number;
    private nome: string;
    private dataCadastro: Timestamp;
    private segmento: {};
    private areaAtuacao: {};
    private tipo: {};
  
    constructor(
      id: number,
      nome: string,
      dataCadastro: Timestamp,
      segmento: {},
      areaAtuacao: {},
      tipo: {},
    ) {
      this.id = id;
      this.nome = nome;
      this.dataCadastro = dataCadastro;
      this.segmento = segmento;
      this.areaAtuacao = areaAtuacao;
      this.tipo = tipo;
    }
  }
  