import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Question } from '../model/question';
@Injectable({
  providedIn: 'root',
})
export class HttpApiServiceService {

  apiURL = 'https://47sdbk9dd7.execute-api.us-east-1.amazonaws.com/TriviaTrialsApiGateway/'; // TODO use constant from config

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>(this.apiURL)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}










// // Angular Modules
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// @Injectable()
// export class ApiHttpService {
//   constructor(
//     // Angular Modules
//     private http: HttpClient
//   ) { }
//   public get(url: string, options?: any) {
//     return this.http.get(url, options);
//   }
//   public post(url: string, data: any, options?: any) {
//     return this.http.post(url, data, options);
//   }
//   public put(url: string, data: any, options?: any) {
//     return this.http.put(url, data, options);
//   }
//   public delete(url: string, options?: any) {
//     return this.http.delete(url, options);
//   }
// }
