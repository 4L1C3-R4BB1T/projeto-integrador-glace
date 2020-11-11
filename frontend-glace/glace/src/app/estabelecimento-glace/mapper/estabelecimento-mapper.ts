import { EstabelecimentoModel } from '../model/estabelecimento-model';
import { EstabelecimentoEntity } from '../entity/estabelecimento-entity';
import { Mapper } from '../../base/mapper';

export class EstabelecimentoMapper extends Mapper<EstabelecimentoEntity, EstabelecimentoModel> {

    mapFrom(entity: EstabelecimentoEntity): EstabelecimentoModel {
        return {
            id: entity.id,
            nome: entity.nome ? entity.nome : '',
            cnpj: entity.cnpj,
            descricao: entity.descricao,
            tipoEstabelecimento: entity.tipoEstabelecimento,
            endereco: entity.endereco,
            acessibilidades: entity.acessibilidades,
            foto: entity.foto
        };
    }

    mapTo(model: EstabelecimentoModel): EstabelecimentoEntity {
        return {
            id: model.id,
            nome: model.nome,
            cnpj: model.cnpj,
            descricao: model.descricao,
            tipoEstabelecimento: model.tipoEstabelecimento,
            endereco: model.endereco,
            acessibilidades: model.acessibilidades,
            foto: model.foto
        };
    }
}
