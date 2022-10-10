import { Injectable } from '@angular/core';

//Index signiture for mapping sound name to sound path
interface Sounds {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class SoundPlayerService {
  sounds: Sounds = {}

  constructor() {
    this.sounds['correct'] = "../../../assets/sounds/correct.wav";
    this.sounds['incorrect'] = "../../../assets/sounds/incorrect.wav";
  }

  playAudio(soundName: string){
    let audio = new Audio();
    audio.src = this.sounds[soundName];
    audio.load();
    audio.play();
  }
}
