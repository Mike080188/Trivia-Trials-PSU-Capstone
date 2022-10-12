import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'main-game-screen',
  templateUrl: './main-game-screen.component.html',
  styleUrls: ['./main-game-screen.component.scss']
})
export class MainGameScreenComponent implements OnInit {

  constructor(
    public gameService: GameService,
) { }


  ngOnInit(): void {
  }

}
