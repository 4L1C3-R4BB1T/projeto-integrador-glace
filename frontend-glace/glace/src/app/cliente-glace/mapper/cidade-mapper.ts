import { CidadeModel } from '../model/cliente-model';
import { CidadeEntity } from '../entity/cliente-entity';
import {Mapper} from '../../base/mapper';
import { from } from 'rxjs';
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
