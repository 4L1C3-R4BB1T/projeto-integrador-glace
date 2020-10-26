import { EstadoModel } from '../model/estabelecimento-model';
import { EstadoEntity } from '../entity/estabelecimento-entity';
import { Mapper } from '../../base/mapper';

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
