import { ParceiroModel } from '../model/parceiro-model';
import { ParceiroEntity } from '../entity/parceiro-entity';
import { Mapper } from '../../base/mapper';

export class ParceiroMapper extends Mapper<ParceiroEntity, ParceiroModel> {

    mapFrom(entity: ParceiroEntity): ParceiroModel {
        return {
            id: entity.id,
            razao: entity.razao ? entity.razao : '',
            cnpj: entity.cnpj,
            telefone: entity.telefone,
            endereco: entity.endereco,
            email: entity.email,
            senha: entity.senha,
            foto: entity.foto
        };
    }

    mapTo(model: ParceiroModel): ParceiroEntity {
        return {
            id: model.id,
            razao: model.razao,
            cnpj: model.cnpj,
            telefone: model.telefone,
            endereco: model.endereco,
            email: model.email,
            senha: model.senha,
            foto: model.foto
        };
    }
}
