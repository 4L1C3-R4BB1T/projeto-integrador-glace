import { EstadoModel } from './../model/cliente-model';
import { EstadoEntity } from './../entity/cliente-entity';
import { Mapper } from 'src/app/base/mapper';
export class EstadoMapper extends Mapper<EstadoEntity, EstadoModel>{
    mapFrom(model: EstadoEntity):EstadoModel{
        return {
            id: model.id,
            nome:model.nome
        };
    }
    mapTo(entity: EstadoModel): EstadoEntity{
        return {
            id: entity.id,
            nome: entity.nome
        };
    }
}