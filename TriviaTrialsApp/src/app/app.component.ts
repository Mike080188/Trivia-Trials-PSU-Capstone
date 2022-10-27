import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { HttpApiServiceService } from './services/http-api-service.service';
import { Question } from './model/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpApiServiceService, GameService]
})
export class AppComponent implements OnInit{

  gameStarted = false;
  playerName = "";
  public questions: Question[];

  ngOnInit() {
  }

  constructor(
    public gameService: GameService,
  ) {}

  startSinglePlayerGame(name: string) {
    this.gameStarted = true;
    this.playerName = name;
    this.gameService.player.name = this.playerName;
    this.gameService.loadQuestions();
  }

}
