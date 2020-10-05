import { CidadeMapper } from '../../cadastro-usuario/mapper/cidade-mapper';
import { EstadoMapper } from '../../cadastro-usuario/mapper/estado-mapper';
import { BaseHttpService } from '../../services/http/base-http.service';
import { environment } from '../../../environments/environment';
import { ParceiroMapper } from '../mapper/parceiro-mapper';
import { ParceiroEntity, EstadoEntity, CidadeEntity } from '../entity/parceiro-entity';
import { ParceiroModel, EstadoModel, CidadeModel } from '../model/parceiro-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ParceiroRepository {

    mapper = new ParceiroMapper();
    mapperEstado = new EstadoMapper();
    mapperCidade = new CidadeMapper();
   
    constructor(public http: BaseHttpService) { }

    getParceiroById(id: number): Observable<ParceiroModel> {
        return this.http
            .getAll<ParceiroModel>(`${environment.URLSERVIDOR}parceiro/${id}`)
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    getAllParceiros(): Observable<ParceiroModel> {
        return this.http
            .getAll<ParceiroEntity[]>(`${environment.URLSERVIDOR}parceiro`)
            .pipe(mergeMap((x) => x.data))
            .pipe(map((x) => this.mapper.mapFrom(x)));
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
 
    postParceiro(param: ParceiroModel) {
        return this.http
            .post<ParceiroEntity>(`${environment.URLSERVIDOR}parceiro`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    putParceiro(param: ParceiroModel) {
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}parceiro/${param.id}`,
                this.mapper.mapTo(param)
            )
            .pipe(map((x) => x.data));
    }

    deleteParceiro(id: number): Observable<void> {
        return this.http
            .delete<void>(`${environment.URLSERVIDOR}parceiro/${id}`, id)
            .pipe(map((x) => x.data));
    }
}
