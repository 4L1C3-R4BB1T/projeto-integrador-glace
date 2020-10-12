export interface ClienteEntity {
    id?: number;
    nome?: string;
    sobrenome?: string;
    cpf?: string;
    dataNasc?: string;
    telefone?: string;
    endereco?: EnderecoEntity;
    email?: string;
    senha?: string;
    foto?: any;
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
