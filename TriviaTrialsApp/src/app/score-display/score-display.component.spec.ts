import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDisplayComponent } from './score-display.component';

describe('ScoreDisplayComponent', () => {
  let component: ScoreDisplayComponent;
  let fixture: ComponentFixture<ScoreDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update playerScore and playerName when they are updated via shared service', () => {
    // Set player name and score in the shared service
    component.getPlayerDetailsService.nameSetSource.next('George');
    component.getPlayerDetailsService.scoreChangedSource.next(55);
    // Player name and score updated in component
    expect(component.playerName).toBe('George');
    expect(component.playerScore).toBe(55);
  });
});
``
