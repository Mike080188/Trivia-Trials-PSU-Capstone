import { Injectable } from '@angular/core';
import { Player } from 'app/model/player';
import { BehaviorSubject, Subject } from 'rxjs';

/*
* Class Declaraiton for PlayerDetailsService class, uses BehaviorSubject to share attribute changes between components
*/
@Injectable({
  providedIn: 'root'
})
export class PlayerDetailsService {

  // Observable sources
  // nameSetSource: BehaviorSubject<string> = new BehaviorSubject('');
  // scoreChangedSource: BehaviorSubject<number> = new BehaviorSubject(0);

  // score: number = 0;
  // player: Player = new Player();

  // constructor() {
  //   this.player.score = 0;
  // }

  // incrementScore(amount: number) {
  //   this.player.score += amount;
  // }
}
