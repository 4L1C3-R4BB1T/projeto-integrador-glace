export interface ReservaEntity {
    id?: number;
    dataReserva?: Date;
    cliente?: ClienteEntity;
    estabelecimento?: EstabelecimentoEntity;
}

export interface ClienteEntity {
    id?: number;
}

export interface EstabelecimentoEntity {
    id?: number;
}