export interface ClienteModel {
    id?: number;
    nome?: string;
    sobrenome?: string;
    telefones?: string;
    dataNasc?: string;
    cpf?: string;
    senha?: string;
    email?: string;
    endereco?: EnderecoModel;
}
export interface EnderecoModel {
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
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