import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { PlayerDetailsService } from 'app/services/player-details.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'score-display',
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.scss']
})
export class ScoreDisplayComponent {

  // @Input() playerName: string = "";
  // @Input() playerScore: number = 0;

  constructor(public playerDetailsService: PlayerDetailsService) { }

  ngOnInit(): void {
    //   //Subscribe to observables for name and score changes
    //   this.playerDetailsService.nameSetSource.subscribe((name) => {
    //       this.playerName = name;
    //   });
    //   this.playerDetailsService.scoreChangedSource.subscribe((score) => {
    //     this.playerScore = score;
    // });
  }

  // get getPlayerDetailsService(): PlayerDetailsService {
  //   return this.playerDetailsService;
  // }
}
