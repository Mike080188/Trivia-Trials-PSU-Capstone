import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TimerComponent } from './timer.component';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display timer from from game service', () => {
    var timerElement = fixture.debugElement.query(By.css('.timer-number'));
    var timerDisplay = timerElement.nativeElement.textContent
    expect(timerDisplay).toEqual(component.gameService.roundTimerStart.toString());
  });

  it('should display new time after 5 seconds passes', () => {
    component.gameService.roundTimer -= 5;
    fixture.detectChanges();

    var timerElement = fixture.debugElement.query(By.css('.timer-number'));
    var timerDisplay = timerElement.nativeElement.textContent
    // 5 seconds should have been decremented from the displayed timer
    expect(timerDisplay).toEqual((component.gameService.roundTimerStart - 5).toString());
  });
});

