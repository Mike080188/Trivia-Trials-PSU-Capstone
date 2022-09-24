import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
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
    // const app = fixture.componentInstance;
    // fixture.debugElement.componentInstance.playerName = "Tester";
    // app.playerName = 'Tester';
    fixture.detectChanges();

    // Start screen is present in DOM
    var startScreenDebugElement = fixture.debugElement.query(By.css('start-screen'));
    expect(startScreenDebugElement).toBeTruthy();

    // const playerNameElement = fixture.debugElement.query(By.css('.name-input')).nativeElement.value = 'Tester';
    // fixture.debugElement.query(By.css('.name-input')).nativeElement.value = 'Tester';
    let input = fixture.debugElement.query(By.css('.name-input'));
    let el = input.nativeElement;
    el.value = 'Tester';
    el.dispatchEvent(new Event('input'));
    // playerNameElement.

    // Click single player button
    const buttonElement = fixture.debugElement.query(By.css('.single-player-button'));
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Start screen no longer present
    startScreenDebugElement = fixture.debugElement.query(By.css('start-screen'));
    expect(startScreenDebugElement).toBeFalsy();
  });
});
