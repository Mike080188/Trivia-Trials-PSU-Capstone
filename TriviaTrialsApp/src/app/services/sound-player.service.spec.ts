import { TestBed } from '@angular/core/testing';

import { SoundPlayerService } from './sound-player.service';

describe('SoundPlayerService', () => {
  let service: SoundPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should play audio', ()  => {
    let mockAudio = new Audio();
    mockAudio.play = jasmine.createSpy()

    spyOn(window, 'Audio').and.returnValue(mockAudio);
    service.playAudio('correct');

    expect(mockAudio.play).toHaveBeenCalled();
  });
});
