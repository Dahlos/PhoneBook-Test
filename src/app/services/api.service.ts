import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Persona, Region } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  REST_API_SERVER = environment.REST_API_SERVER;
  constructor(private httpClient: HttpClient) {}

  public getRegions() {
    return this.httpClient
      .get<Region[]>(`${this.REST_API_SERVER}/region`)
      .pipe(catchError(this.handleError));
  }

  public getPersonas() {
    return this.httpClient
      .get<Persona[]>(`${this.REST_API_SERVER}/persona`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
