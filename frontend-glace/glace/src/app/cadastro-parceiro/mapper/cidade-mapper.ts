import { CidadeModel } from './../model/parceiro-model';
import { CidadeEntity } from './../entity/parceiro-entity';
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