import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StartScreenComponent } from './start-screen.component';

describe('StartScreenComponent', () => {
  let component: StartScreenComponent;
  let fixture: ComponentFixture<StartScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when "Single Player Game" is clicked and a name provided', () => {
    const fixture = TestBed.createComponent(StartScreenComponent);
    // spy on event emitter
    const component = fixture.componentInstance;
    spyOn(component.newSinglePlayerGameEvent, 'emit');

    // PLayer adds name
    component.playerName = 'Tester';

    // Click Single Player button
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.single-player-button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // Event has been emitted with the player's name
    expect(component.newSinglePlayerGameEvent.emit).toHaveBeenCalledWith('Tester');
    // Game has been initiated
    expect(component.gameInitiated).toBeTrue()
 });

 it('should not emit event when "Single Player Game" is clicked and a name not provided', () => {
  const fixture = TestBed.createComponent(StartScreenComponent);
  // spy on event emitter
  const component = fixture.componentInstance;
  spyOn(component.newSinglePlayerGameEvent, 'emit');

  // Click single player button
  const nativeElement = fixture.nativeElement;
  const button = nativeElement.querySelector('.single-player-button');
  button.dispatchEvent(new Event('click'));

  fixture.detectChanges();

  // No Event emitted since player hasn't entered name
  expect(component.newSinglePlayerGameEvent.emit).toHaveBeenCalledTimes(0);
});

it('should show red border on name input when game initiated but no name provided unitl user provides name', () => {
  const fixture = TestBed.createComponent(StartScreenComponent);
  const component = fixture.componentInstance;

  // Initiate game without entering name
  const nativeElement = fixture.nativeElement;
  const button = nativeElement.querySelector('.single-player-button');
  button.dispatchEvent(new Event('click'));
  fixture.detectChanges();

  let input = fixture.debugElement.query(By.css('.name-input'));
  let input_el = input.nativeElement;

  // Red border since player didn't enter name and initiated a game
  expect(input_el.classList.contains('red-border')).toBeTruthy()

  // Player enters name
  component.playerName = 'Tester';
  fixture.detectChanges();

  // No more red border since player entered name
  expect(input_el.classList.contains('red-border')).toBeFalsy()
});

});
