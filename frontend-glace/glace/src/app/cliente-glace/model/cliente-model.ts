export interface ClienteModel {
    id?: number;
    nome?: string;
    sobrenome?: string;
    cpf?: string;
    dataNasc?: string;
    telefone?: string;
    endereco?: EnderecoModel;
    email?: string;
    senha?: string;
    foto?: any;
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
