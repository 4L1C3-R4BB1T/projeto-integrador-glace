import { BaseHttpService } from '../../services/http/base-http.service';
import { environment } from '../../../environments/environment';
import { ReservaMapper } from '../mapper/reserva-mapper';
import { ReservaEntity } from '../entity/reserva-entity';
import { ReservaModel } from '../model/reserva-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ReservaRepository {

    mapper = new ReservaMapper();
  
    constructor(public http: BaseHttpService) { }

    getAllReservas(param: string): Observable<ReservaModel> {
        return this.http
        .getAll<ReservaEntity[]>(`${environment.URLSERVIDOR}reserva${param}`)
        .pipe(mergeMap((x) => x.data))
        .pipe(map((x) => this.mapper.mapFrom(x)));
    }

    postReserva(param: ReservaModel) {
        return this.http
            .post<ReservaModel>(`${environment.URLSERVIDOR}reserva`, this.mapper.mapTo(param))
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    getAllReservasByCliente(id: number): Promise<ReservaModel[]> {
        return this.http
            .getAll<ReservaEntity[]>(`${environment.URLSERVIDOR}reserva/${id}/cliente`)
            .toPromise().then(x => {
                return x.data.map(this.mapper.mapFrom);
            });
    }

    getAllReservasByEstabelecimento(id: number): Promise<ReservaModel[]> {
        return this.http
            .getAll<ReservaEntity[]>(`${environment.URLSERVIDOR}reserva/${id}/estabelecimento`)
            .toPromise().then(x => {
                return x.data.map(this.mapper.mapFrom);
            });
    }

    
    getReservaById(id: number): Observable<ReservaModel> {
        
        return this.http
            .getAll<ReservaModel>(`${environment.URLSERVIDOR}reserva/${id}`)
            .pipe(map((x) => this.mapper.mapFrom(x.data)));
    }

    deleteReserva(id: number): Observable<void> {
        return this.http
            .delete<void>(`${environment.URLSERVIDOR}reserva/${id}`, id)
            .pipe(map((x) => x.data));
    }

    
    putReserva(param: ReservaModel) {
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}reserva/${param.id}`,
                this.mapper.mapTo(param)
            )
            .pipe(map((x) => x.data));
    }
    
}
