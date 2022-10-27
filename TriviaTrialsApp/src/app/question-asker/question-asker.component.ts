import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';
import { Question } from 'app/model/question';
import { Answer } from 'app/model/answer';
import { SoundPlayerService } from 'app/services/sound-player.service';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'question-asker',
  templateUrl: './question-asker.component.html',
  styleUrls: ['./question-asker.component.scss']
})
export class QuestionAskerComponent implements OnInit {

  @Input() question: Question;

  constructor(
      public gameService: GameService,
      public soundPlayerService: SoundPlayerService,
      public commonService:CommonService
  ) { }

  ngOnInit(): void {
    this.gameService.questionSource.subscribe((question) => {
      this.question = question;
  });
  }

  async answerQuestion(answer: Answer) {
    this.gameService.answersDisabled = true;
    if(answer.isCorrect) {
      this.soundPlayerService.playAudio('correct')
      // var roundScore = this.evaluateCorrectAnswer()
      this.gameService.incrementScore(1)
    }
    else {
      this.soundPlayerService.playAudio('incorrect')
    }
    // await this.commonService.delay(2500);
    this.gameService.nextRound();
    // this.answersDisabled = false;
  }
  // evaluateCorrectAnswer() {
  //   throw new Error('Method not implemented.');
  // }
}
