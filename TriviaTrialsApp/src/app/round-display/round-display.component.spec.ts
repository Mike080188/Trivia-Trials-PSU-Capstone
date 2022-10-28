import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RoundDisplayComponent } from './round-display.component';

describe('RoundDisplayComponent', () => {
  let component: RoundDisplayComponent;
  let fixture: ComponentFixture<RoundDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundDisplayComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display round number during the game', async () => {
    const fixture = TestBed.createComponent(RoundDisplayComponent);

    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.gameService.round = 4;
    component.gameService.gameOn = true;

    fixture.detectChanges();

    // Round was set to four, so should display 'Round: 4'
    var roundElement = fixture.debugElement.query(By.css('.round'));
    var roundText = roundElement.nativeElement.textContent
    expect(roundText.trim()).toEqual("Round: 4");
  });

  it('Should display Game Over when game is over', async () => {
    const fixture = TestBed.createComponent(RoundDisplayComponent);
    const component = fixture.componentInstance;

    component.gameService.gameOver = true;

    fixture.detectChanges();

    // gameOver was set to true so should display 'Game Over'
    var roundElement = fixture.debugElement.query(By.css('.round'));
    var roundText = roundElement.nativeElement.textContent
    expect(roundText.trim()).toEqual("Game Over");
  });
});
