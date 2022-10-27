import { Component } from '@angular/core';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'score-display',
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.scss']
})
export class ScoreDisplayComponent {

  // @Input() playerName: string = "";
  // @Input() playerScore: number = 0;

  constructor(public gameService: GameService) { }

  ngOnInit(): void {}
}
