import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Question } from '../model/question';
@Injectable({
  providedIn: 'root',
})
export class HttpApiServiceService {

  getQuestionsUrl = 'https://6udxzjb1e2.execute-api.us-east-1.amazonaws.com/TriviaTrialsApiGateway/'; // TODO use constant from config
  saveScorUrl = 'https://6eje8pht04.execute-api.us-east-1.amazonaws.com/TriviaTrialsSaveScoreApiGateway/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>(this.getQuestionsUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  saveScore(name: string, score: number): Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      'name': name,
      'score': score.toString()
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http
      .get(this.saveScorUrl, requestOptions)
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
