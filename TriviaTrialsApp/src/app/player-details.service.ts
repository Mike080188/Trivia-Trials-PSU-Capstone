import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

/*
* Class Declaraiton for PlayerDetailsService class, uses BehaviorSubject to share attribute changes between components
*/
@Injectable({
  providedIn: 'root'
})
export class PlayerDetailsService {

  // Observable sources
  nameSetSource: BehaviorSubject<string> = new BehaviorSubject('');
  scoreChangedSource: BehaviorSubject<number> = new BehaviorSubject(0);
}
