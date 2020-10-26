import { EstadoModel } from '../model/cliente-model';
import { EstadoEntity } from '../entity/cliente-entity';
import { Mapper } from '../../../app/base/mapper';

export class EstadoMapper extends Mapper<EstadoEntity, EstadoModel> {

    mapFrom(param: EstadoEntity):EstadoModel{
        return {
            id: param.id,
            nome:param.nome
        };
    }
    mapTo(param: EstadoModel): EstadoEntity{
        return {
            id: param.id,
            nome: param.nome
        };
    }
}