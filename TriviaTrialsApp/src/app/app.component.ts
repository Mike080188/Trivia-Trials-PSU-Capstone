import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { HttpApiServiceService } from './services/http-api-service.service';
import { PlayerDetailsService } from './services/player-details.service';
import { Question } from './model/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PlayerDetailsService, HttpApiServiceService, GameService]
})
export class AppComponent implements OnInit{
  title = 'TriviaTrialsApp';
  gameStarted = false;
  playerName = "";
  // score = 0;
  public questions: Question[];

  ngOnInit() {
  }

  constructor(
    private playerDetailsService: PlayerDetailsService,
    private apiHttpService: HttpApiServiceService,
    private gameService: GameService,
  ) {}

  startSinglePlayerGame(name: string) {
    this.gameStarted = true;
    this.playerName = name;
    this.playerDetailsService.player.name = this.playerName;
    this.gameService.loadQuestions();
  }

}
