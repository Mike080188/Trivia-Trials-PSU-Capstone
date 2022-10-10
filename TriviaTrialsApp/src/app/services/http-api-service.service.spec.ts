import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpApiServiceService } from './http-api-service.service';

describe('HttpApiServiceService', () => {
  let service: HttpApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpApiServiceService]
    });
    service = TestBed.inject(HttpApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
