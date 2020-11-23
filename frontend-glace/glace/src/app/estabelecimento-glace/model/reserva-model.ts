export interface ReservaModel {
    id?: number;
    dataReserva?: Date;
    cliente?: ClienteModel;
    estabelecimento?: EstabelecimentoModel;
}

export interface ClienteModel {
    id?: number;
}

export interface EstabelecimentoModel {
    id?: number;
}