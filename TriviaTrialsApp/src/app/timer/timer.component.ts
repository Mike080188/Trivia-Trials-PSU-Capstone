import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

}
