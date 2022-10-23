import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';
import { Question } from 'app/model/question';
import { Answer } from 'app/model/answer';
import { SoundPlayerService } from 'app/services/sound-player.service';
import { PlayerDetailsService } from 'app/services/player-details.service';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'question-asker',
  templateUrl: './question-asker.component.html',
  styleUrls: ['./question-asker.component.scss']
})
export class QuestionAskerComponent implements OnInit {

  // @Input() question: Question;
  answersDisabled: boolean = false;

  constructor(
      public gameService: GameService,
      public soundPlayerService: SoundPlayerService,
      public playerDetailService: PlayerDetailsService,
      public commonService:CommonService
  ) { }

  ngOnInit(): void {
  //   this.gameService.questionSource.subscribe((question) => {
  //     this.question = question;
  // });
  }

  async answerQuestion(answer: Answer) {
    this.answersDisabled = true;
    if(answer.isCorrect) {
      this.soundPlayerService.playAudio('correct')
      // var roundScore = this.evaluateCorrectAnswer()
      this.playerDetailService.incrementScore(1)
    }
    else {
      this.soundPlayerService.playAudio('incorrect')
    }
    this.gameService.nextRound();
  }
}
