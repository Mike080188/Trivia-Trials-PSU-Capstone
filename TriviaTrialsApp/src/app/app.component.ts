import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { PlayerDetailsService } from './player-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PlayerDetailsService]
})
export class AppComponent implements OnInit{
  title = 'TriviaTrialsApp';
  gameStarted = false;
  playerName = "";
  score = 0;

  ngOnInit() {
  }

  constructor(private playerDetailsService: PlayerDetailsService) {
  }

  startGame(name: string) {
    this.gameStarted = true;
    this.playerName = name;
    this.playerDetailsService.nameSetSource.next(this.playerName); // Send name to scoreboard
  }

}
