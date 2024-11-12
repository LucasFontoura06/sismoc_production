import { Timestamp } from 'firebase/firestore';
import { CONSTANTES } from '../../common/constantes';

export class Endereco {
  private id: string;
  private bairro: string;
  private cep: string;
  private cidade: string; // Nome da cidade
  private codMunicipio: string; // Código do município
  private complemento: string;
  private logradouro: string;
  private numero: string;
  private uf: string;
  private dataCadastro: Timestamp;

  constructor(
    id: string,
    bairro: string,
    cep: string,
    cidade: string,
    codMunicipio: string,
    complemento: string,
    logradouro: string,
    numero: string,
    uf: string,
    dataCadastro: Timestamp
  ) {
    this.id = id;
    this.bairro = bairro;
    this.cep = cep;
    this.cidade = cidade;
    this.codMunicipio = codMunicipio;
    this.complemento = complemento;
    this.logradouro = logradouro;
    this.numero = numero;
    this.uf = uf;
    this.dataCadastro = dataCadastro;
  }

  static empty() {
    return new Endereco(
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      Timestamp.now()
    );
  }

  static fromFirestore(data: any): Endereco {
    return new Endereco(
      data.id,
      data.bairro,
      data.cep,
      data.cidade,
      data.codMunicipio,
      data.complemento,
      data.logradouro,
      data.numero,
      data.uf,
      data.dataCadastro
    );
  }

  getId() {
    return this.id;
  }

  getBairro() {
    return this.bairro;
  }

  getCep() {
    return this.cep;
  }

  getCidade() {
    return this.cidade;
  }

  getCodMunicipio() {
    return this.codMunicipio;
  }

  getComplemento() {
    return this.complemento;
  }

  getLogradouro() {
    return this.logradouro;
  }

  getNumero() {
    return this.numero;
  }

  getUf() {
    return this.uf;
  }

  getDataCadastro() {
    return this.dataCadastro;
  }

  setId(id: string) {
    this.id = id;
  }

  setBairro(bairro: string) {
    this.bairro = bairro;
  }

  setCep(cep: string) {
    this.cep = cep;
  }

  setCidade(cidade: string) {
    this.cidade = cidade;
  }

  setCodMunicipio(codMunicipio: string) {
    this.codMunicipio = codMunicipio;
  }

  setComplemento(complemento: string) {
    this.complemento = complemento;
  }

  setLogradouro(logradouro: string) {
    this.logradouro = logradouro;
  }

  setNumero(numero: string) {
    this.numero = numero;
  }

  setUf(uf: string) {
    this.uf = uf;
  }

  setDataCadastro(dataCadastro: Timestamp) {
    this.dataCadastro = dataCadastro;
  }
}