import { TestBed } from '@angular/core/testing';

import { OmdbSvcService } from './omdb-svc.service';

describe('OmdbSvcService', () => {
  let service: OmdbSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmdbSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
