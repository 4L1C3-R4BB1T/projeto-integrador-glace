import { EstabelecimentoModel } from '../model/estabelecimento-model';
import { EstabelecimentoEntity } from '../entity/estabelecimento-entity';
import { Mapper } from '../../base/mapper';

export class EstabelecimentoMapper extends Mapper<EstabelecimentoEntity, EstabelecimentoModel> {

    mapFrom(entity: EstabelecimentoEntity): EstabelecimentoModel {
        return {
            id: entity.id,
            nome: entity.nome,
            cnpj: entity.cnpj,
            telefone: entity.telefone,
            endereco: entity.endereco,
            descricao: entity.descricao,
            tipoEstabelecimento: entity.tipoEstabelecimento,
            foto: entity.foto,
            parceiroGlace: entity.parceiroGlace,
            acessibilidades: entity.acessibilidades
        };
    }


    mapTo(model: EstabelecimentoModel): EstabelecimentoEntity {
        return {
            id: model.id,
            nome: model.nome,
            cnpj: model.cnpj,
            telefone: model.telefone,
            endereco: model.endereco,
            descricao: model.descricao,
            tipoEstabelecimento: model.tipoEstabelecimento,
            foto: model.foto,
            parceiroGlace: model.parceiroGlace,
            acessibilidades: model.acessibilidades
        };
    }
}
