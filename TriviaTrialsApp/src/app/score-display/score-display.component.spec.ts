import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScoreDisplayComponent } from './score-display.component';

describe('ScoreDisplayComponent', () => {
  let component: ScoreDisplayComponent;
  let fixture: ComponentFixture<ScoreDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreDisplayComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display playerScore and playerName', () => {
    // Set player name and score in component
    component.gameService.player.name = 'Tester';
    component.gameService.player.score = 44;
    fixture.detectChanges();

    // Score number should be displayed as 44'
    var scoreNumberElement = fixture.debugElement.query(By.css('.score-number'));
    var scoreNumber = scoreNumberElement.nativeElement.textContent
    expect(scoreNumber).toEqual("44");

    // Name should be displayed as 'Tester'
    var scoreNameElement = fixture.debugElement.query(By.css('.score-name'));
    var scoreName = scoreNameElement.nativeElement.textContent
    expect(scoreName).toEqual("Tester");
  });

  // it('should update playerScore and playerName when they are updated via shared service', () => {
  //   // Set player name and score in the shared service
  //   component.gameService.player.name= 'George';
  //   component.gameService.player.score = 55;
  //   // Player name and score updated in component
  //   expect(component.gameService.player.name).toBe('George');
  //   expect(component.gameService.player.score).toBe(55);
  // });
});
``
