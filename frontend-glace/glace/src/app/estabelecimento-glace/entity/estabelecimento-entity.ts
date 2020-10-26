export interface EstabelecimentoEntity {
  id?: number;
  nome?: string;
  cnpj?: string;
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
