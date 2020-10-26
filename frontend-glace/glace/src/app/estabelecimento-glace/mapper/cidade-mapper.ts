import { CidadeModel } from '../model/estabelecimento-model';
import { CidadeEntity } from '../entity/estabelecimento-entity';
import { Mapper } from '../../base/mapper';

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