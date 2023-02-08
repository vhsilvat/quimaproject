import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  constructor(private httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Basic c3VwZXJ1c2VyOnBhc3N3b3Jk'

      }),
      observe: "response" as 'body'
    };
    return this.httpClient.get(
      url,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  delete(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Basic c3VwZXJ1c2VyOnBhc3N3b3Jk'
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.delete(
      url,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  post(url: string, product: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Basic c3VwZXJ1c2VyOnBhc3N3b3Jk'
      }),
      observe: "response" as 'body'
    };
    const productAsJson = JSON.stringify(product);
    return this.httpClient.post(
      url,
      productAsJson,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  put(url: string, product: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Basic c3VwZXJ1c2VyOnBhc3N3b3Jk'
      }),
      observe: "response" as 'body'
    };
    const productAsJson = JSON.stringify(product);
    return this.httpClient.put(
      url,
      productAsJson,
      httpOptions
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  private ReturnResponseData(response: any) {
    return response;
  }
  private handleError(error: any) {
    return throwError(error);
  }
}
