import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';
import { Question } from 'app/model/question';
import { Answer } from 'app/model/answer';
import { SoundPlayerService } from 'app/services/sound-player.service';

@Component({
  selector: 'question-asker',
  templateUrl: './question-asker.component.html',
  styleUrls: ['./question-asker.component.scss']
})
export class QuestionAskerComponent implements OnInit {

  @Input() question: Question;

  constructor(
      public gameService: GameService,
      public soundPlayerService: SoundPlayerService
  ) { }

  ngOnInit(): void {
    this.gameService.questionSource.subscribe((question) => {
      this.question = question;
  });
  }

  answerQuestion(answer: Answer) {
    if(answer.isCorrect) {
      this.soundPlayerService.playAudio('correct')
    }
    else {
      this.soundPlayerService.playAudio('incorrect')
    }
  }

  // loadNextQuestion() {
  // }

}
