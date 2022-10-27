import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'round-display',
  templateUrl: './round-display.component.html',
  styleUrls: ['./round-display.component.scss']
})
export class RoundDisplayComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

}
