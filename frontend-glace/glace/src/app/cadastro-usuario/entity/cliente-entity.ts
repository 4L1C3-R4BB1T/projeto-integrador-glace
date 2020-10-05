export interface ClienteEntity {
    id?: number;
    nome?: string;
    sobrenome?: string;
    telefones?: string;
    dataNasc?: string;
    cpf?: string;
    email?: string;
    senha?: string;
    endereco?: EnderecoEntity;
}
export interface EnderecoEntity {
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
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