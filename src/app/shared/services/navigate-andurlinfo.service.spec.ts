import { TestBed } from '@angular/core/testing';

import { NavigateAndurlinfoService } from './navigate-andurlinfo.service';

describe('NavigateAndurlinfoService', () => {
  let service: NavigateAndurlinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigateAndurlinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
