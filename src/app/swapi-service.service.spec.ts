import { TestBed } from '@angular/core/testing';

import { SwapiServiceService } from './swapi-service.service';

describe('SwapiServiceService', () => {
  let service: SwapiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
