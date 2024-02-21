import { TestBed } from '@angular/core/testing';

import { LlantasService } from './llantas.service';

describe('LlantasService', () => {
  let service: LlantasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlantasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
