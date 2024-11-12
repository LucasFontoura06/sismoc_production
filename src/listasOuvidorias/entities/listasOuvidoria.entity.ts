import { Timestamp } from 'firebase/firestore';

export class ListasOuvidoria {
  id?: string;
  cargoSelecionado: {
    id: string;
    descricao: string;
  };
  cidadeSelecionada: {
    id: number;
    descricao: string;
  };
  uf: string;
  parceiroSelecionado: {
    id: string;
    descricao: string;
  };
  datas: {
    dataEnvio: string;
    dataGeracao: string;
    dataRetorno: string | null;
  };
  totais: {
    totalCandidatos: number;
    totalInteressados: number;
    totalNegativas: number;
  };
  vagas: string[];
  arquivo: {
    nome: string;
    url: string;
  };
  pbf: {
    comPbf: boolean;
    semPbf: boolean;
  };

  constructor(
    cargoSelecionado: { id: string; descricao: string },
    cidadeSelecionada: { id: number; descricao: string },
    uf: string,
    parceiroSelecionado: { id: string; descricao: string },
    datas: { dataEnvio: string; dataGeracao: string; dataRetorno: string | null },
    totais: { totalCandidatos: number; totalInteressados: number; totalNegativas: number },
    vagas: string[],
    arquivo: { nome: string; url: string },
    pbf: { comPbf: boolean; semPbf: boolean },
    id?: string
  ) {
    this.cargoSelecionado = cargoSelecionado;
    this.cidadeSelecionada = cidadeSelecionada;
    this.uf = uf;
    this.parceiroSelecionado = parceiroSelecionado;
    this.datas = datas;
    this.totais = totais;
    this.vagas = vagas;
    this.arquivo = arquivo;
    this.pbf = pbf;
    if (id) this.id = id;
  }
}
