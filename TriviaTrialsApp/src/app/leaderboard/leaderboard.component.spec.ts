import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameScore } from 'app/model/game_score';

import { LeaderboardComponent } from './leaderboard.component';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct header for making the leaderboard', () => {
    component.gameService.player = new GameScore()
    component.gameService.player.name = "Tester"
    component.gameService.player.score = 100

    // Add player to leaderboard
    component.gameService.leaderboard.push(component.gameService.player)

    let response = component.getLeaderboardHeader()

    expect(response).toEqual("Top Score!");
  });

  it('should return correct header for NOT making the leaderboard', () => {
    let testScore = new GameScore()
    testScore.name = "Tester"
    testScore.score = 100

    component.gameService.player = new GameScore()
    component.gameService.player.name = "Tester_2"
    component.gameService.player.score = 200

    // Add non-player score to leaderboard
    component.gameService.leaderboard.push(testScore)

    let response = component.getLeaderboardHeader()

    expect(response).toEqual("Leaderboard");
  });

});
