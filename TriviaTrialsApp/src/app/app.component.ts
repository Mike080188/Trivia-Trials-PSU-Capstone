import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TriviaTrialsApp';
  gameStarted = false;
  playerName = "";
  score = 0;

  ngOnInit() {
  }

  startGame(name: string) {
    this.gameStarted = true;
    this.playerName = name;
  }
}
