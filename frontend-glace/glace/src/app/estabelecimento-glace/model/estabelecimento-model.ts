import { Url } from 'url';

export interface EstabelecimentoModel {
  id?: number;
  nome?: string;
  cnpj?: string;
  tipoEstabelecimento?: string;
  descricao?: string;
  telefone?: string;
  endereco?: EnderecoModel;
  foto?: any;
  parceiroGlace?: ParceiroModel;
  acessibilidades?: AcessibilidadeModel[];
}

export interface ParceiroModel {
  id?: number;
}

export interface EnderecoModel {
  rua?: string;
  numero?: string;
  bairro?: string;
  cep?: string;
  cidade?: CidadeModel;
}

export interface CidadeModel {
  id?: number;
  nome?: string;
  estado?: EstadoModel;
}

export interface EstadoModel {
  id?: number;
  nome?: string;
}

export interface FotoModel{
  id?: number;
  nomeArquivo?: string;
  nomeArquivoCompleto?: string;
  contentType?: string;
  tamanho?: number;
  url?: Url;
}

export interface AcessibilidadeModel {
  id?: number;
  tipoAcessibilidade?: string;
}
