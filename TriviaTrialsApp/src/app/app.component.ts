import { Component, OnInit } from '@angular/core';
// import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TriviaTrialsApp';
  gameStarted = false;
  //Test Commit 2

  ngOnInit() {
    // this.title;
  }

  startGame(newGame: string) {
    this.gameStarted = true;
  }
}
