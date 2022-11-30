import { Component, OnInit } from '@angular/core';
import { GameScore } from 'app/model/game_score';
import { GameService } from 'app/services/game.service';


@Component({
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  constructor(
    public gameService: GameService
  ) {}

  ngOnInit(): void {
  }

  getLeaderboardHeader() {

    let isTopScore = false;

    this.gameService.leaderboard.forEach((item) => {
      if (item.name == this.gameService.player.name && item.score == this.gameService.player.score) {
        isTopScore = true;
      }
    })

    if (isTopScore) {
      return "Top Score!"
    }
    return "Leaderboard"
  }

}
