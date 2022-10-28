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
      declarations: [ QuestionAskerComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.gameService, "nextRound").and.stub(); // don't call api
    spyOn(component.gameService.soundPlayerService, "playAudio").and.stub(); // don't play audio
    spyOn(component.commonService, "delay").and.stub();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should play proper sound for correct answer', () => {
    // Set answer as correct
    var ans = new Answer();
    ans.answer = "Test Answer";
    ans.isCorrect = true;
    // spyOn(component.soundPlayerService, "playAudio").and.stub();
    component.answerQuestion(ans);
    expect(component.soundPlayerService.playAudio).toHaveBeenCalledWith("correct");
  });

  it('should play proper sound for incorrect answer', () => {
    // Set answer as incorrect
    var ans = new Answer();
    ans.answer = "Test Answer";
    ans.isCorrect = false;
    // spyOn(component.soundPlayerService, "playAudio").and.stub();
    component.answerQuestion(ans);
    expect(component.soundPlayerService.playAudio).toHaveBeenCalledWith("incorrect");
  });

  it('should display question and 4 answers from game service', () => {
    // Setup gameService question which this is bound to
    component.gameService.currentQuestion = 0;
    component.gameService.questions = [
      { question: "Q1",
        answers: [
          {answer: "A1", isCorrect: true},
          {answer: "A2", isCorrect: false},
          {answer: "A3", isCorrect: false},
          {answer: "A4", isCorrect: false}
      ]}
  ];

    fixture.detectChanges();

    var questionElement = fixture.debugElement.query(By.css('.question'));
    var question = questionElement.nativeElement.textContent
    expect(question).toEqual("Q1");

    var answersArray = fixture.debugElement.queryAll(By.css('.answer'));
    expect(answersArray.length).toEqual(4);
  });
});
