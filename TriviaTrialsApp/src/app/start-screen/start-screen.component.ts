import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  side_nav_open = false;

  @Output() newSinglePlayerGameEvent = new EventEmitter<string>();

  // constructor() { }

  ngOnInit(): void {
    this.side_nav_open = false;
  }

  startSinglePlayer() {
    console.log("Game Started!")
    this.newSinglePlayerGameEvent.emit("event_data");
  }

}
