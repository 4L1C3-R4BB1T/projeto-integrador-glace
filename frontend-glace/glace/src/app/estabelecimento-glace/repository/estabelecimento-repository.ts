import { CidadeMapper } from '../mapper/cidade-mapper';
import { EstadoMapper } from '../mapper/estado-mapper';
import { BaseHttpService } from '../../services/http/base-http.service';
import { environment } from '../../../environments/environment';
import { EstabelecimentoMapper } from '../mapper/estabelecimento-mapper';
import { EstabelecimentoEntity, EstadoEntity, CidadeEntity } from '../entity/estabelecimento-entity';
import { EstabelecimentoModel, EstadoModel, CidadeModel } from '../model/estabelecimento-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ImagemEntity } from '../entity/imagem-entity';
import { ImagemMapper } from '../mapper/imagem-mapper';
import { ReservaModel } from '../model/reserva-model';

@Injectable({
    providedIn: 'root',
})
export class EstabelecimentoRepository {

    mapper = new EstabelecimentoMapper();
    mapperEstado = new EstadoMapper();
    mapperCidade = new CidadeMapper();
    mapperImagem = new ImagemMapper();

    constructor(public http: BaseHttpService) { }

    getAllEstabelecimentos(param: string): Observable<EstabelecimentoModel> {
        return this.http
        .getAll<EstabelecimentoEntity[]>(`${environment.URLSERVIDOR}estabelecimento${param}`)
        .pipe(mergeMap((x) => x.data))
        .pipe(map((x) => this.mapper.mapFrom(x)));
    }

    getAllEstabelecimentosParceiros(id: number): Promise<EstabelecimentoModel[]> {
        return this.http
            .getAll<EstabelecimentoEntity[]>(`${environment.URLSERVIDOR}parceiro/listarPorParceiro/${id}`)
            .toPromise().then(x => {
                return x.data.map(this.mapper.mapFrom);
            })            
    }

    getEstabelecimentoById(id: number): Observable<EstabelecimentoModel> {
        return this.http
            .getAll<EstabelecimentoModel>(`${environment.URLSERVIDOR}estabelecimento/${id}`)
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    postEstabelecimento(param: EstabelecimentoModel) {
        return this.http
            .post<EstabelecimentoModel>(`${environment.URLSERVIDOR}estabelecimento`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    postImagem(param: any) {
        return this.http
            .post<ImagemEntity>(`${environment.URLSERVIDOR}imagem`, param)
            .pipe(map((x) => this.mapperImagem.mapFrom(x.data)));
    }

    getAllEstados(): Observable<EstadoModel> {
        return this.http
            .getAll<EstadoEntity[]>(`${environment.URLSERVIDOR}estado`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapperEstado.mapFrom(x)));
    }

    getAllCidadesByEstado(id: number): Observable<CidadeModel> {
        console.log(id);
        return this.http
            .getAll<CidadeEntity[]>(`${environment.URLSERVIDOR}estado/${id}/cidades`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapperCidade.mapFrom(x)));
    }
    

    putEstabelecimento(param: EstabelecimentoModel) {
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}estabelecimento/${param.id}`,
                this.mapper.mapTo(param)
            )
            .pipe(map((x) => x.data));
    }

    deleteEstabelecimento(id: number): Observable<void> {
        return this.http
            .delete<void>(`${environment.URLSERVIDOR}estabelecimento/${id}`, id)
            .pipe(map((x) => x.data));
    }
    
}
