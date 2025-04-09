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

  it('service should be exist',()=>{

    expect(service['router']).toBeDefined()

  })
});
