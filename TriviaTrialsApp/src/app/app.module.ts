import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { MainGameScreenComponent } from './main-game-screen/main-game-screen.component';
import { FormsModule } from '@angular/forms';
import { ScoreDisplayComponent } from './score-display/score-display.component';
import { HttpClientModule } from '@angular/common/http';
import { Constants } from './config/constants';
import { QuestionAskerComponent } from './question-asker/question-asker.component';
import { TimerComponent } from './timer/timer.component';
import { RoundDisplayComponent } from './round-display/round-display.component';


@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    MainGameScreenComponent,
    ScoreDisplayComponent,
    QuestionAskerComponent,
    TimerComponent,
    RoundDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatListModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
