import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StartScreenComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TriviaTrialsApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TriviaTrialsApp');
  });

  it('Should start game when "Single Player Game" button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // Start screen is present in DOM
    var startScreenDebugElement = fixture.debugElement.query(By.css('start-screen'));
    expect(startScreenDebugElement).toBeTruthy();

    const buttonElement = fixture.debugElement.query(By.css('.single-player-button'));
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    startScreenDebugElement = fixture.debugElement.query(By.css('start-screen'));
    expect(startScreenDebugElement).toBeFalsy();
  });
});
