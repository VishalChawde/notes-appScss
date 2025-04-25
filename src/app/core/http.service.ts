import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 403) {
      this.router.navigate(['session-timeout']);
    }
    return throwError(() => error.error || error.message || 'Unknown error');
  }

  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(url, { params }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getWithoutSnackbarError(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(url, { params }).pipe(
      catchError((error: HttpErrorResponse) => throwError(() => error.error))
    );
  }

  post(url: string, body: object = {}): Observable<any> {
    return this.http.post(url, body).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  postWithoutSnackbarError(url: string, body: object = {}): Observable<any> {
    return this.http.post(url, body);
  }

  put(url: string, body: object = {}): Observable<any> {
    return this.http.put(url, body).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // post1(url: string, body: object = {}): Observable<any> {
  //   return this.http.post(url, body, {
  //     headers: { 'Content-Type': 'application/json' }
  //   }).pipe(
  //     catchError(this.handleError.bind(this))
  //   );
  // }
  post1(url: string, body: object = {}): Observable<any> {
    return this.http.post(url, body, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  

  delete(url: string): Observable<any> {
    return this.http.delete(url).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getPostAttachment(path: string, body: any): Observable<HttpResponse<Blob>> {
    return this.http.post(path, body, {
      observe: 'response',
      responseType: 'blob'
    } as {
      observe: 'response';
      responseType: 'blob';
    }).pipe(
      catchError((error) => throwError(() => error.error || 'File download failed'))
    );
  }
  
}
