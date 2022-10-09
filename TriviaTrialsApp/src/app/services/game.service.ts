import { Injectable } from '@angular/core';
// import { Game } from 'app/shared/Game';
import { Question } from 'app/model/question';
import { BehaviorSubject } from 'rxjs';
import { HttpApiServiceService } from './http-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // Observable sources
  questionSource: BehaviorSubject<Question> = new BehaviorSubject(new Question());
  roundChangedSource: BehaviorSubject<number> = new BehaviorSubject(1);

  question: Question = new Question();



  // questions: Question[];
  // round: number = 1;

  constructor(private apiHttpService: HttpApiServiceService) { }

  public loadQuestions() {

  }

}
