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
  commonService(commonService: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  soundPlayerService(soundPlayerService: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  title = 'TriviaTrialsApp';
  gameStarted = false;
  playerName = "";
  public questions: Question[];

  ngOnInit() {
  }

  constructor(
    private playerDetailsService: PlayerDetailsService,
    private apiHttpService: HttpApiServiceService,
    public gameService: GameService,
  ) {}

  startSinglePlayerGame(name: string) {
    this.gameStarted = true;
    this.playerName = name;
    this.playerDetailsService.player.name = this.playerName;
    this.gameService.loadQuestions();
  }

}
