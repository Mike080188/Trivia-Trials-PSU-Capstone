import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Answer } from 'app/model/answer';
import { Question } from 'app/model/question';

import { QuestionAskerComponent } from './question-asker.component';

describe('QuestionAskerComponent', () => {
  let component: QuestionAskerComponent;
  let fixture: ComponentFixture<QuestionAskerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should play proper sound for correct answer', () => {
    // Set answer as correct
    var ans = new Answer();
    ans.answer = "Test Answer";
    ans.isCorrect = true;
    spyOn(component.soundPlayerService, "playAudio").and.stub();
    component.answerQuestion(ans);
    expect(component.soundPlayerService.playAudio).toHaveBeenCalledWith("correct");
  });

  it('should play proper sound for incorrect answer', () => {
    // Set answer as incorrect
    var ans = new Answer();
    ans.answer = "Test Answer";
    ans.isCorrect = false;
    spyOn(component.soundPlayerService, "playAudio").and.stub();
    component.answerQuestion(ans);
    expect(component.soundPlayerService.playAudio).toHaveBeenCalledWith("incorrect");
  });

  it('should wait 2.5 seconds before staring next round', () => {
    // Set answer as incorrect
    var ans = new Answer();
    ans.answer = "Test Answer";
    ans.isCorrect = true;
    spyOn(component.commonService, "delay").and.stub();
    spyOn(component.soundPlayerService, "playAudio").and.stub();
    component.answerQuestion(ans);

    expect(component.commonService.delay).toHaveBeenCalledWith(2500);
  });
});
