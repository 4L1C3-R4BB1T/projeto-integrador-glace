import { Url } from 'url';

export interface EstabelecimentoEntity {
  id?: number;
  nome?: string;
  cnpj?: string;
  tipoEstabelecimento?: string;
  descricao?: string;
  telefone?: string;
  endereco?: EnderecoEntity;
  foto?: any;
  parceiroGlace?: ParceiroEntity;
  acessibilidades?: AcessibilidadeEntity[];
}

export interface ParceiroEntity {
  id?: number;
}

export interface EnderecoEntity {
  rua?: string;
  numero?: string;
  bairro?: string;
  cep?: string;
  cidade?: CidadeEntity;
}

export interface CidadeEntity {
  id?: number;
  nome?: string;
  estado?: EstadoEntity;
}

export interface EstadoEntity {
  id?: number;
  nome?: string;
}

export interface FotoEntity {
  id?: number;
  nomeArquivo?: string;
  nomeArquivoCompleto?: string;
  contentType?: string;
  tamanho?: number;
  url?: Url;
}

export interface AcessibilidadeEntity {
  id?: number;
  tipoAcessibilidade?: string;
}
