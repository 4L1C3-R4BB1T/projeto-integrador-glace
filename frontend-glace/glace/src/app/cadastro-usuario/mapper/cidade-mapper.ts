import { CidadeModel } from '../model/cliente-model';

import { CidadeEntity } from './../entity/cliente-entity';
import { Mapper } from './../../../app/base/mapper';

export class CidadeMapper extends Mapper<CidadeEntity, CidadeModel> {

  mapFrom(model: CidadeEntity): CidadeModel {

    return {
      id: model.id,
      nome: model.nome,
      estado: model.estado
    };
  }

  mapTo(entity: CidadeModel): CidadeEntity {
    return {
      id: entity.id,
      nome: entity.nome,
      estado: entity.estado
    };
  }
}
