import { TestBed } from '@angular/core/testing';

import { NavigateAndurlinfoService } from './navigate-andurlinfo.service';
import { Router } from '@angular/router';

fdescribe('NavigateAndurlinfoService', () => {
  let service: NavigateAndurlinfoService;
  let routerMock: jasmine.SpyObj<Router>;
  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['url', 'navigate'], {
      url: 'somewhere/someone',
    });

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerMock }],
    });
    service = TestBed.inject(NavigateAndurlinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('functions', () => {
    beforeEach(() => {
      routerMock.navigateByUrl;
    });

    it('actualUrl should work', () => {
      const result = service.actualUrl();
      expect(result).toBe('somewhere/someone');
    });
  });
});
