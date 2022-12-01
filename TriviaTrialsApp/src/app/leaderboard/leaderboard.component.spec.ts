import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it("should highlight player's name and score on leaderboard", () => {
    let testScore = new GameScore()
    testScore.name = "Tester"
    testScore.score = 100

    component.gameService.player = new GameScore()
    component.gameService.player.name = "Tester_2"
    component.gameService.player.score = 200


    // Remove emtpy score
    component.gameService.leaderboard.splice(0);
    // Add non-player score to leaderboard
    component.gameService.leaderboard.push(component.gameService.player)
    component.gameService.leaderboard.push(testScore)

    component.gameService.leaderboardLoaded = true;

    fixture.detectChanges();

    // 3 cells (1 row) should have player-row class, which highlights yellow
    var playerRowCells = fixture.debugElement.queryAll(By.css('.player-row'));
    expect(playerRowCells.length).toEqual(3);
  });

  it("When game is over, leaderboard is displayed", () => {

    component.gameService.gameOver = true;
    component.gameService.leaderboardLoaded = true;

    fixture.detectChanges();

    // Leaderboard is displayed
    var playerRowCells = fixture.debugElement.queryAll(By.css('.leaderboard-table'));
    expect(playerRowCells.length).toEqual(1);
  });
});
