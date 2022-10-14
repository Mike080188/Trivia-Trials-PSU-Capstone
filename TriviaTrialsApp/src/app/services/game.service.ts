import { ThisReceiver } from '@angular/compiler';
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

  questions: Question[] = [new Question];
  currentQuestion: number = 0;
  gameOn: boolean = true;
  maxQuestions: number = 6; // will be 10
  round: number = 1;

  constructor(private apiHttpService: HttpApiServiceService) { }

  public nextRound() {
    this.currentQuestion < (this.maxQuestions - 1) ? this.currentQuestion += 1: this.endGame();
    this.round += 1;
  }

  public endGame() {
    console.log("game over")
    this.gameOn = false;
  }

  public loadQuestions() {
    this.apiHttpService.getQuestions().subscribe((q) => {
      this.questions = q;
    });

  }

}
