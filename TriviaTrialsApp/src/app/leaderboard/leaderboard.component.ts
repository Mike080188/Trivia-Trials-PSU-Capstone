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
  //   let Array<GameScore> = [
  //     {
  //       // name: "train_1",
  //       // x: data.filtrationData.map((i: any) => i["1-CumVol"]),
  //       // y: data.filtrationData.map((i: any) => i["1-PressureA"]),
  //       // type: "scatter",
  //       // mode: "lines"
  //     },

  // }

  //   models: GameScore[] = [];

  // let array = this.gameService.leaderboard
    // let array: new [GameScore]
  //  let GameScore[] = [new GameScore];

  //  let a = GameScore<{}>

    let isTopScore = false;

    this.gameService.leaderboard.forEach((item, index) => {
      if (item.name == this.gameService.player.name && item.score == this.gameService.player.score) {
        isTopScore = true;
      }
    })

    // let playerGameScore = new GameScore
    // playerGameScore.name = this.gameService.player.name
    // playerGameScore.score= this.gameService.player.score
    if (isTopScore) {
      return "Top Score!"
    }
    return "Leaderboard"
  }

}
