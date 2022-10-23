import { Injectable } from '@angular/core';
import { Question } from 'app/model/question';
import { BehaviorSubject, timer } from 'rxjs';
import { CommonService } from './common.service';
import { HttpApiServiceService } from './http-api-service.service';
import { Observable } from 'rxjs';
import { SoundPlayerService } from './sound-player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // Observable sources
  questionSource: BehaviorSubject<Question> = new BehaviorSubject(new Question());
  roundChangedSource: BehaviorSubject<number> = new BehaviorSubject(1);

  questions: Question[] = [new Question];
  currentQuestion: number = 0;
  maxQuestions: number = 10;
  gameOn: boolean = false;
  round: number = 1;
  roundTimer: number = 30;
  readonly roundTimerStart: number = 30;
  counter$: Observable<number>;
  interval: any;
  answersDisabled: boolean = false;

  constructor(
      private apiHttpService: HttpApiServiceService,
      public soundPlayerService: SoundPlayerService,
      public commonService: CommonService
  ) {}

  public async nextRound() {
    clearInterval(this.interval);
    await this.commonService.delay(2500);
    this.currentQuestion < (this.maxQuestions - 1) ? this.currentQuestion += 1: this.endGame();
    this.round += 1;
    this.startRound();
  }
  async startRound() {
    this.answersDisabled = false;
    this.setTimer();
  }

  setTimer() {
    this.roundTimer = this.roundTimerStart;
    this.interval = setInterval(() => this.checkTime(), 1000);
  }

  checkTime() {
    if (this.roundTimer == 1 && this.gameOn) {
      this.roundTimer = 0;
      this.soundPlayerService.playAudio('incorrect')
      this.nextRound()
      return
    }
    this.roundTimer--
  }

  public endGame() {
    console.log("game over")
    this.gameOn = false;
    clearInterval(this.interval);
  }

  public loadQuestions() {
    this.apiHttpService.getQuestions().subscribe((q) => {
      this.questions = q;
      this.startRound();
      this.gameOn = true;
    });
  }
}
