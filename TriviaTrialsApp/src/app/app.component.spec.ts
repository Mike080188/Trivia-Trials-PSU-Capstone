import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MainGameScreenComponent } from './main-game-screen/main-game-screen.component';
import { ScoreDisplayComponent } from './score-display/score-display.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [
        AppComponent,
        StartScreenComponent,
        ScoreDisplayComponent,
        MainGameScreenComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should start game when "Single Player Game" button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.gameService, "loadQuestions").and.stub(); // don't call api
    spyOn(component.gameService.soundPlayerService, "playAudio").and.stub(); // don't play audio

    // Start screen is present in DOM
    var startScreenDebugElement = fixture.debugElement.query(By.css('start-screen'));
    expect(startScreenDebugElement).toBeTruthy();

    //Change input name to 'Tester'
    let input = fixture.debugElement.query(By.css('.name-input'));
    let el = input.nativeElement;
    el.value = 'Tester';
    el.dispatchEvent(new Event('input'));

    // Click single player button
    const buttonElement = fixture.debugElement.query(By.css('.single-player-button'));
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Start screen no longer present
    startScreenDebugElement = fixture.debugElement.query(By.css('start-screen'));
    expect(startScreenDebugElement).toBeFalsy();
  });


  it('Should display score during the game', async () => {
    const fixture = TestBed.createComponent(AppComponent);

    const component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.gameService, "loadQuestions").and.stub(); // don't call api
    spyOn(component.gameService.soundPlayerService, "playAudio").and.stub(); // don't play audio

    // Start game with name 'Tester'
    component.startSinglePlayerGame('Tester');
    fixture.detectChanges();

    // Score number should be displayed as '0'
    var scoreNumberElement = fixture.debugElement.query(By.css('.score-number'));
    var scoreNumber = scoreNumberElement.nativeElement.textContent
    expect(scoreNumber).toEqual("0");

    // Name should be displayed as 'Tester'
    var scoreNameElement = fixture.debugElement.query(By.css('.score-name'));
    var scoreName = scoreNameElement.nativeElement.textContent
    expect(scoreName).toEqual("Tester");
  });


  it('Should display score during the game', async () => {
    const fixture = TestBed.createComponent(AppComponent);

    const component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.gameService, "loadQuestions").and.stub(); // don't call api
    spyOn(component.gameService.soundPlayerService, "playAudio").and.stub(); // don't play audio

    // Start game with name 'Tester'
    component.startSinglePlayerGame('Tester');
    fixture.detectChanges();

    // Score number should be displayed as '0'
    var scoreNumberElement = fixture.debugElement.query(By.css('.score-number'));
    var scoreNumber = scoreNumberElement.nativeElement.textContent
    expect(scoreNumber).toEqual("0");

    // Name should be displayed as 'Tester'
    var scoreNameElement = fixture.debugElement.query(By.css('.score-name'));
    var scoreName = scoreNameElement.nativeElement.textContent
    expect(scoreName).toEqual("Tester");
  });

  // it('Should display round number during the game', async () => {
  //   const fixture = TestBed.createComponent(AppComponent);

  //   const component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   spyOn(component.gameService, "loadQuestions").and.stub(); // don't call api

  //   component.gameService.round = 4;
  //   component.gameService.gameOn = true;

  //   // Start game with name 'Tester'
  //   component.startSinglePlayerGame('Tester');
  //   fixture.detectChanges();

  //   // Round was set to four, so should display 'Round: 4'
  //   var roundElement = fixture.debugElement.query(By.css('.round'));
  //   var roundText = roundElement.nativeElement.textContent
  //   expect(roundText.trim()).toEqual("Round: 4");
  // });
});

