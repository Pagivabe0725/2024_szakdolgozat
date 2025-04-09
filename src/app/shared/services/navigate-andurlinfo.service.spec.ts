import { TestBed } from '@angular/core/testing';

import { NavigateAndurlinfoService } from './navigate-andurlinfo.service';
import { Router } from '@angular/router';

fdescribe('NavigateAndurlinfoService', () => {
  let service: NavigateAndurlinfoService;
  let routerMock: jasmine.SpyObj<Router>;
  beforeEach(() => {
    routerMock = jasmine.createSpyObj(
      'Router',
      ['url', 'navigate', 'navigateByUrl'],
      {
        url: 'somewhere/someone',
      }
    );

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

    describe('navigate', () => {
      it('should navigate to private route if basicSide is true and path is in navigations', () => {
        service.navigate(true, 'main');
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith('private/main');
      });

      it('should navigate to nested route if basicSide is false', () => {
        service.navigate(false, 'child');
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith(
          'somewhere/someone/child'
        );
      });
    });

    it('basicNavigate should work',()=>{

      service.basicNavigate('public')
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('public')
    })
  });
});
