import { ImagemModel } from '../model/imagem-model';
import { ImagemMapper } from '../mapper/imagem-mapper';
import { ImagemEntity } from '../entity/imagem-entity';
import { CidadeMapper } from '../mapper/cidade-mapper';
import { EstadoMapper } from '../mapper/estado-mapper';
import { BaseHttpService } from '../../services/http/base-http.service';
import { environment } from '../../../environments/environment';
import { ClienteMapper } from '../mapper/cliente-mapper';
import { ClienteEntity, EstadoEntity, CidadeEntity } from '../entity/cliente-entity';
import { ClienteModel, EstadoModel, CidadeModel } from '../model/cliente-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ClienteRepository {

    mapper = new ClienteMapper();
    mapperEstado = new EstadoMapper();
    mapperCidade = new CidadeMapper();
    mapperImagem = new ImagemMapper();

    constructor(public http: BaseHttpService) { }

    getClienteById(id: number): Observable<ClienteModel> {
        
        return this.http
            .getAll<ClienteModel>(`${environment.URLSERVIDOR}cliente/${id}`)
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    getAllClientes(): Promise<ClienteModel[]> {
        
        return this.http
            .getAll<ClienteEntity[]>(`${environment.URLSERVIDOR}cliente`)
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

    postCliente(param: ClienteModel) {
        
        return this.http
            .post<ClienteEntity>(`${environment.URLSERVIDOR}cliente`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    postImagem(param: any) {
        
        return this.http
            .post<ImagemEntity>(`${environment.URLSERVIDOR}imagem`, param)
            .pipe(map((x) => this.mapperImagem.mapFrom(x.data)));
    }

    putCliente(param: ClienteModel) {
        
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}cliente/${param.id}`,
                this.mapper.mapTo(param)
            )
            .pipe(map((x) => x.data));
    }

    deleteCliente(id: number): Observable<void> {
        
        return this.http
            .delete<void>(`${environment.URLSERVIDOR}cliente/${id}`, id)
            .pipe(map((x) => x.data));
    }
}
