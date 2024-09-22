import { TestBed } from '@angular/core/testing';

import { RouterPlusService } from './router-plus.service';

describe('RouterPlusService', () => {
  let service: RouterPlusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterPlusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
