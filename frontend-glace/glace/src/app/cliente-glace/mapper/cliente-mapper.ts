import { ClienteModel } from '../model/cliente-model';
import { ClienteEntity } from '../entity/cliente-entity';
import { Mapper } from '../../base/mapper';

export class ClienteMapper extends Mapper<ClienteEntity, ClienteModel> {

    mapFrom(entity: ClienteEntity): ClienteModel {
        return {
            id: entity.id,
            nome: entity.nome ? entity.nome : '',
            sobrenome: entity.sobrenome,
            cpf: entity.cpf,
            dataNasc: entity.dataNasc,
            telefone: entity.telefone,
            endereco: entity.endereco,
            email: entity.email,
            senha: entity.senha,
            foto: entity.foto,
        };
    }

    mapTo(model: ClienteModel): ClienteEntity {
        return {
            id: model.id,
            nome: model.nome,
            sobrenome: model.sobrenome,
            cpf: model.cpf,
            dataNasc: model.dataNasc,
            telefone: model.telefone,
            endereco: model.endereco,
            email: model.email,
            senha: model.senha,
            foto: model.foto,
        };
    }
}
