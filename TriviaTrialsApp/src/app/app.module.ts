import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { MainGameScreenComponent } from './main-game-screen/main-game-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    MainGameScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
