import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  playerName: string = "";
  gameInitiated: boolean = false;

  @Output() newSinglePlayerGameEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  startSinglePlayer() {
    this.gameInitiated = true;
    if(!this.playerName) {
      console.log("Need a name")
      return;
    }
    console.log("Game Started!")
    this.newSinglePlayerGameEvent.emit(this.playerName);
  }

}
