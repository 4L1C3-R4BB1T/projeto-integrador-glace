import { ReservaModel } from '../model/reserva-model';
import { ReservaEntity } from '../entity/reserva-entity';
import { Mapper } from '../../base/mapper';

export class ReservaMapper extends Mapper<ReservaEntity, ReservaModel> {

    mapFrom(param: ReservaEntity): ReservaModel {
        return {
            id: param.id,
            dataReserva: param.dataReserva,
            cliente: param.cliente,
            estabelecimento: param.estabelecimento,
            confirmarReserva: param.confirmarReserva
        }
    }

    mapTo(param: ReservaModel): ReservaEntity {
        return {
            id: param.id,
            dataReserva: param.dataReserva,
            cliente: param.cliente,
            estabelecimento: param.estabelecimento,
            confirmarReserva: param.confirmarReserva
        }
    }
    

}