import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let navigateMock:jasmine.SpyObj<NavigateAndurlinfoService>
  beforeEach(async () => {

    navigateMock = jasmine.createSpyObj(NavigateAndurlinfoService,['navigate'])
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers:[{provide: NavigateAndurlinfoService, useValue:navigateMock}]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });

  describe('Before onInit', () => {
    it('mode should be light', () => {
      expect(component.mode).toEqual('light');
    });

    it('colorArray should be definied', () => {
      expect(component.colorArray).toEqual([
        'basic-light',
        'basic-dark',
        'azure-light',
        'azure-dark',
        'magenta-light',
        'magenta-dark',
        'cyan-light',
        'cyan-dark',
      ]);
    });

    it('actulaColor should be basic-light', () => {
      expect(component.actualColor).toBe('basic-light');
    });
  });


  describe('Basic tests',()=>{

    it('should create', () => {
      expect(component).toBeTruthy();
      console.log(fixture.nativeElement);
    });
  })
  
});
