import { Timestamp } from 'firebase/firestore';
import { Cargo } from 'src/cargos/entities/cargo.entity';
import { CONSTANTES } from 'src/common/constantes';

export class Vaga {
  private id: string;
  private cargo: {
    id: string;
    descricao: string;
  };  
  private escolaridade: string;
  private postos: number;
  private endereco: {
    uf: string;
    cidade: string;
    codMunicipio: string;
    bairro: string;
  };
  private pcd: boolean;
  private dataCadastro: Timestamp;

  constructor(
    id: string,
    cargo: {
        id: string;
        descricao: string;
      },    
    escolaridade: string,
    postos: number,
    endereco: {
      uf: string;
      cidade: string;
      codMunicipio: string;
      bairro: string;
    },
    pcd: boolean,
    dataCadastro: Timestamp
  ) {
    this.id = id;
    this.cargo = cargo;
    this.escolaridade = escolaridade;
    this.postos = postos;
    this.endereco = endereco;
    this.pcd = pcd;
    this.dataCadastro = dataCadastro;
  }

  static empty() {
    return new Vaga(
      CONSTANTES.VAZIO,
      { 
        id: CONSTANTES.VAZIO, 
        descricao: CONSTANTES.VAZIO 
      },
      CONSTANTES.VAZIO,
      0,
      {
        uf: CONSTANTES.VAZIO,
        cidade: CONSTANTES.VAZIO,
        codMunicipio: CONSTANTES.VAZIO,
        bairro: CONSTANTES.VAZIO,
      },
      false,
      Timestamp.now()
    );
  }

  toFirestore() {
    return {
      id: this.id,
      cargo: this.cargo,
      escolaridade: this.escolaridade,
      postos: this.postos,
      endereco: this.endereco,
      pcd: this.pcd,
      dataCadastro: this.dataCadastro,
    };
  }

  static fromFirestore(data: any): Vaga {
    return new Vaga(
      data.id,
      data.cargo,
      data.escolaridade,
      data.postos,
      data.endereco,
      data.pcd,
      data.dataCadastro
    );
  }

  // Getters
  getId() {
    return this.id;
  }

  getCargo() {
    return this.cargo;
  }

  getEscolaridade() {
    return this.escolaridade;
  }

  getPostos() {
    return this.postos;
  }

  getEndereco() {
    return this.endereco;
  }

  getPcd() {
    return this.pcd;
  }

  getDataCadastro() {
    return this.dataCadastro;
  }

  // Setters
  setId(id: string) {
    this.id = id;
  }

  setCargo(cargo:  {
    id: string;
    descricao: string;
  }) {
    this.cargo = cargo;
  }

  setEscolaridade(escolaridade: string) {
    this.escolaridade = escolaridade;
  }

  setPostos(postos: number) {
    this.postos = postos;
  }

  setEndereco(endereco: {
    uf: string;
    cidade: string;
    codMunicipio: string;
    bairro: string;
  }) {
    this.endereco = endereco;
  }

  setPcd(pcd: boolean) {
    this.pcd = pcd;
  }

  setDataCadastro(dataCadastro: Timestamp) {
    this.dataCadastro = dataCadastro;
  }
}