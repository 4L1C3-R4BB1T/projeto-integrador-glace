import { CidadeModel } from './../model/cliente-model';
import { CidadeEntity } from './../entity/cliente-entity';
import { Mapper } from './../../../app/base/mapper';

export class CidadeMapper extends Mapper<CidadeEntity, CidadeModel> {

   
  mapFrom(param: CidadeEntity): CidadeModel {

    return {
      id: param.id,
      nome: param.nome,
      estado: param.estado,
     
    };
  }

  mapTo(param: CidadeModel): CidadeEntity {
    return {
      id: param.id,
      nome: param.nome,
      estado: param.estado,
     
    };
  }
}
