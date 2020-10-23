export interface EstabelecimentoModel {
  id?: number;
  nome?: string;
  cnpj?: string;
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
