import { Component, OnInit } from '@angular/core';
// import { EventEmitter } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  side_nav_open = false;

  @Output() newGameEvent = new EventEmitter<string>();

  // constructor() { }

  ngOnInit(): void {
    this.side_nav_open = false;
  }

  startSinglePlayer() {
    console.log("Game Started!")
    this.newGameEvent.emit("event_data");
  }

}
