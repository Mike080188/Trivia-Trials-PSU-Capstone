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
    spyOn(service.soundPlayerService, "playAudio").and.stub();
    spyOn(service.commonService, "delay").and.stub();
    spyOn(service, "setTimer").and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not increment score when timer ran out and should move on to next round', ()  => {
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

  it('should display round number for 2.5 seconds before showing question', async ()  => {


    service.gameOn = false;

    await service.startRound();
    // // 2.5 seconds waited
    expect(service.commonService.delay).toHaveBeenCalledWith(2500);
    // // gameOn will display the question-asker again
    expect(service.gameOn).toBe(true);
  });

  it('should wait 2.5 seconds after question answered before staring next round', async () => {
    spyOn(service, "startRound").and.stub();
    service.gameOn = false;
    service.round = 3;
    service.currentQuestion = 2;

    await service.nextRound();
    // // 2.5 seconds waited
    expect(service.commonService.delay).toHaveBeenCalledWith(2500);
    // Round and question incremented
    expect(service.round).toBe(4);
    expect(service.currentQuestion).toBe(3);
    // New round started
    expect(service.startRound).toHaveBeenCalled();
  });

});
