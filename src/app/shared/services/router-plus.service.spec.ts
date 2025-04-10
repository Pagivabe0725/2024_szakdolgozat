import { TestBed } from '@angular/core/testing';

import { RouterPlusService } from './router-plus.service';
import { Router } from '@angular/router';

fdescribe('RouterPlusService', () => {
  let service: RouterPlusService;
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
    service = TestBed.inject(RouterPlusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('service should be exist', () => {
    expect(service['router']).toBeDefined();
  });

  describe('Functions:', () => {
    it('getURLEndPoint should work', () => {
      expect(service.getURLEndPoint()).toEqual('someone');
    });

    it('getURLElementsInArray should work', () => {
      expect(service.getURLElementsInArray()).toEqual(['somewhere', 'someone']);
    });

    it('getURLElementsInString should work', () => {
      expect(service.getURLElementsInString(0)).toEqual('somewhere/someone/');
      expect(service.getURLElementsInString(1)).toEqual('somewhere/');
    });

    it('navigateToNewPage should work', () => {
      service.navigateToNewPage('TestPage');
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith(
        'somewhere/TestPage'
      );
    });

    it('navigateToNewPage should work', () => {
      service.navigateToChildPage('TestPage');
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith(
        'somewhere/someone/TestPage'
      );
    });
  });
});
