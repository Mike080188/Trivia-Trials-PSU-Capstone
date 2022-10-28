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

    spyOn(component.gameService, "loadQuestions").and.stub(); // don't call api

    component.gameService.round = 4;
    component.gameService.gameOn = true;

    // Start game with name 'Tester'
    // component.startSinglePlayerGame('Tester');
    fixture.detectChanges();

    // Round was set to four, so should display 'Round: 4'
    var roundElement = fixture.debugElement.query(By.css('.round'));
    var roundText = roundElement.nativeElement.textContent
    expect(roundText.trim()).toEqual("Round: 4");
  });
});
