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

@Injectable({
    providedIn: 'root',
})
export class EstabelecimentoRepository {

    mapper = new EstabelecimentoMapper();
    mapperEstado = new EstadoMapper();
    mapperCidade = new CidadeMapper();

    constructor(public http: BaseHttpService) { }

    getAllEstabelecimentos(): Observable<EstabelecimentoModel> {
        return this.http
        .getAll<EstabelecimentoEntity[]>(`${environment.URLSERVIDOR}estabelecimento`)
        .pipe(mergeMap((x) => x.data))
        .pipe(map((x) => this.mapper.mapFrom(x)));
    }

    postEstabelecimento(id: number, param: EstabelecimentoModel) {
        return this.http
            .post<EstabelecimentoEntity>(`${environment.URLSERVIDOR}estabelecimento/${id}/parceiro`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    getAllEstados(): Observable<EstadoModel> {
        return this.http
            .getAll<EstadoEntity[]>(`${environment.URLSERVIDOR}estado`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapperEstado.mapFrom(x)));
    }

    getAllCidadesByEstado(id: number): Observable<CidadeModel> {
        return this.http
            .getAll<CidadeEntity[]>(`${environment.URLSERVIDOR}estado/${id}/cidades`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapperCidade.mapFrom(x)));
    }

    putEstabelecimento(param: EstabelecimentoModel) {
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}parceiro/${param.id}`,
                this.mapper.mapTo(param)
            )
            .pipe(map((x) => x.data));
    }

    deleteEstabelecimento(id: number): Observable<void> {
        return this.http
            .delete<void>(`${environment.URLSERVIDOR}parceiro/${id}`, id)
            .pipe(map((x) => x.data));
    }
}
