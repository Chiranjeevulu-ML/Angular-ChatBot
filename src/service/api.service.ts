import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class API {
  header: any;

  constructor(
    private http: HttpClient,
  ) {

  }
  
  post(url: string, body: any, headerInfo:any={}) {
     const headers = new HttpHeaders({ 'Content-Type': 'application/json', ...headerInfo });
    return this.http.post(url, body, { headers});
  }
  
  get(url: string):  Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(url, { headers });
  }

  put(url: string, body: any) {
    // return this.http.put(url, body).map(res => res)
    //   .catch((error: HttpErrorResponse) => Observable.throw(this.errorHandler(error)));
  }
  // delete(url: string): Observable<any> {
  //   return this.http.delete(url, this.header).map((res) => res)
  //     .catch((error: any) => Observable.throw(this.errorHandler(error)));
  // }
  errorHandler(error: any): void {
    return error;
  }


}