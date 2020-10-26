import { ImagemModel } from './../model/imagem-model';
import { ImagemEntity } from './../entity/imagem-entity';
import { Mapper } from './../../../app/base/mapper';
export class ImagemMapper extends Mapper<ImagemEntity, ImagemModel> {
    mapFrom(entity: ImagemEntity): ImagemModel {
        return {
            id:entity.id,
            nomeArquivo: entity.nomeArquivo, 
            contentType: entity.contentType,
            tamanho: entity.tamanho,
            url: entity.url,
            
        };
    }
    mapTo(model: ImagemModel): ImagemEntity {
        return {
            id:model.id,
            nomeArquivo: model.nomeArquivo, 
            contentType: model.contentType,
            tamanho: model.tamanho,
            url: model.url,
        };
    }
}