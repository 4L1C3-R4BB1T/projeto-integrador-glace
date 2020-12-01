export interface ReservaModel {
    id?: number;
    dataReserva?: Date;
    cliente?: ClienteModel;
    estabelecimento?: EstabelecimentoModel;
    confirmarReserva?: number;
}

export interface ClienteModel {
    id?: number;
}

export interface EstabelecimentoModel {
    id?: number;
}