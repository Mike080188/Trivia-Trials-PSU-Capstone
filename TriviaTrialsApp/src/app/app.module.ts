import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { MainGameScreenComponent } from './main-game-screen/main-game-screen.component';
import { FormsModule } from '@angular/forms';
import { ScoreDisplayComponent } from './score-display/score-display.component';


@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    MainGameScreenComponent,
    ScoreDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
