import { AuthService } from './../../seguranca/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, retry, delay, map } from 'rxjs/operators';
import { DefaultResponse } from './default-response';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient,
        private service: AuthService) {}

      headers = new HttpHeaders();

      post<T>(
        url,
        body,
        useDefaultHeader: boolean = true,
        useFormData: boolean = false,
        newHeaders: HttpHeaders = null
      ): Observable<DefaultResponse<T>> {
        return this.request<T>(
          'POST',
          `${url}`,
          body,
          useDefaultHeader,
          useFormData,
          newHeaders
        );
      }

      put<T>(
        url,
        body,
        useDefaultHeader: boolean = true,
        useFormData: boolean = false
      ): Observable<DefaultResponse<T>> {
        return this.request<T>(
          'PUT',
          `${url}`,
          body,
          useDefaultHeader,
          useFormData
        );
      }

      patch<T>(url, body): Observable<DefaultResponse<T>> {
        return this.request<T>('PATCH', `${url}`, body);
      }

      get<T>(url): Observable<DefaultResponse<T>> {
        return this.request<T>('GET', `${url}`);
      }

      delete<T>(url, id: number): Observable<DefaultResponse<T>> {
        return this.request<T>('DELETE', `${url}`, { id });
      }

      private request<T>(
        type: string,
        url: string,
        body: any = null,
        useDefaultHeader: boolean = true,
        useFormData: boolean = false,
        newHeaders: HttpHeaders = null
      ): Observable<DefaultResponse<T>> {

        let headers: HttpHeaders;
        headers = newHeaders || this.getDefaultHeader(useFormData);

        if (environment.logRequest) {
          console.dir({ type, url, headers, body });
        }

        if (environment.traceRequest) {
          // tslint:disable-next-line: no-console
         // console.trace('trace');
        }

        return this.http
          .request<T>(type, url, {
            body,
            headers
          })
          .pipe(
            shareReplay(),
            retry(0),
            delay(500),
            map((x) => this.onsuccess<T>(type, x))
          );
      }

      private getDefaultHeader(useFormData: boolean = false) {
        const token: string = localStorage.getItem('token');
       if(token){
        const headers = new HttpHeaders({'Authorization':'Bearer '+ token});
        return headers;
      }
       }

      private oncatch<T>(e) {
        const result = new DefaultResponse<T>();
        result.error(e);
        return result;
      }

      private onsuccess<T>(type, e) {
        const result = new DefaultResponse<T>();
        result.success(type, e);
        return result;
      }

      getData(url: string): Observable<any> {
        return this.http.get(url).pipe(map(this.extractData));
      }

      private extractData(res: Response) {
        const body = res;
        return body || {};
      }
    }
