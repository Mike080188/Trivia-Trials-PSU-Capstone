import { Injectable } from '@angular/core';
import { Question } from 'app/model/question';
import { BehaviorSubject, timer } from 'rxjs';
import { CommonService } from './common.service';
import { HttpApiServiceService } from './http-api-service.service';
import { Observable } from 'rxjs';
import { SoundPlayerService } from './sound-player.service';
import { Player } from 'app/model/player';

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
  roundTimer: number = 20;
  readonly roundTimerStart: number = 20;
  counter$: Observable<number>;
  interval: any;
  answersDisabled: boolean = false;
  gameOver: boolean = false;


  player: Player = new Player();

  incrementScore(amount: number) {
    this.player.score += amount;
  }

  constructor(
      private apiHttpService: HttpApiServiceService,
      public soundPlayerService: SoundPlayerService,
      public commonService: CommonService
  ) {
    this.player.score = 0;
  }

  public async nextRound() {

    clearInterval(this.interval);
    await this.commonService.delay(2500);
    this.currentQuestion < (this.maxQuestions - 1) ? this.currentQuestion += 1: this.endGame();
    this.round += 1;
    this.startRound();
  }
  async startRound() {
    clearInterval(this.interval);
    if (this.gameOver) {
      return
    }
    // Hide question asker for 2.5 seconds just displaying new round number
    this.gameOn = false;
    await this.commonService.delay(2500);
    this.gameOn = true;
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
    this.gameOver = true;
    this.gameOn = false;
    clearInterval(this.interval);
  }

  public loadQuestions() {
    this.apiHttpService.getQuestions().subscribe((q) => {
      this.questions = q;
      this.startRound();
    });
  }
}
