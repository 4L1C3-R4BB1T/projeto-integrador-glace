import { ImagemMapper } from './../mapper/imagem-mapper';
import { ImagemEntity } from './../entity/imagem-entity';
import { ImagemModel } from './../model/imagem-model';
import { CidadeMapper } from '../mapper/cidade-mapper';
import { EstadoMapper } from '../mapper/estado-mapper';
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
    mapperImagem = new ImagemMapper();
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

    getAllParceiro(): Promise<ParceiroModel[]> {
        
        return this.http
            .getAll<ParceiroEntity[]>(`${environment.URLSERVIDOR}parceiro`)
            .toPromise().then(x => {
                return x.data.map(this.mapper.mapFrom);
            })            
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
    postImagem(param: any) {
        return this.http
            .post<ImagemEntity>(`${environment.URLSERVIDOR}imagem`, param)
            .pipe(map((x) => this.mapperImagem.mapFrom(x.data)));
    }
    getImagemById(id: number): Observable<ImagemModel> {
        return this.http
            .getAll<ImagemModel>(`${environment.URLSERVIDOR}imagem/${id}`)
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }
    putImageById(param: ImagemModel) {
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}imagem/${param.id}`,
                this.mapper.mapTo(param)
            )
            .pipe(map((x) => x.data));
    }

    deleteImagem(id: number): Observable<void> {
        return this.http
            .delete<void>(`${environment.URLSERVIDOR}imagem/${id}`, id)
            .pipe(map((x) => x.data));
    }

    
}
