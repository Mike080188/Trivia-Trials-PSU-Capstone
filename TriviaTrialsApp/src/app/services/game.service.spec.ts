import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not increment score when timer ran out and should move on to next round', ()  => {
    spyOn(service.soundPlayerService, "playAudio").and.stub();
    spyOn(service, "nextRound").and.stub();

    service.gameOn = true;;
    service.roundTimer = 1;
    service.player.score = 0;
    service.checkTime();
    // Score was not incremented
    expect(service.player.score).toBe(0);
    // Game moves to next round
    expect(service.nextRound).toHaveBeenCalled();
  });
});
