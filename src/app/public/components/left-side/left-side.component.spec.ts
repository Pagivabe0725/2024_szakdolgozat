import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftSideComponent } from './left-side.component';
import { RouterPlusService } from '../../../shared/services/router-plus.service';

describe('left-side.component', () => {
  let component: LeftSideComponent;
  let fixture: ComponentFixture<LeftSideComponent>;
  let routerPlusMock: jasmine.SpyObj<RouterPlusService>;

  beforeEach(async () => {
    routerPlusMock = jasmine.createSpyObj('RouterPlusService', [
      'getURLEndPoint',
      'navigateToNewPage',
    ]);
    await TestBed.configureTestingModule({
      imports: [LeftSideComponent],
      providers: [{ provide: RouterPlusService, useValue: routerPlusMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftSideComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  xit('should set page to "registration" when getURLEndPoint returns anything other than "login"', () => {
    routerPlusMock.getURLEndPoint.and.returnValue('registration');
    fixture.detectChanges();
    expect(component.page).toBe('registration');
  });

  xit('should set page to "login" when getURLEndPoint returns "login"', () => {
    routerPlusMock.getURLEndPoint.and.returnValue('login');
    fixture.detectChanges();
    expect(component.page).toBe('login');
  });

  it('should toggle page between "login" and "registration" and call navigateToNewPage with the correct page', () => {
    // Ellenőrizzük, hogy az alapértelmezett page értéke "login"
    expect(component.page).toBe('login');

    // Hívjuk meg a navigate metódust, és ellenőrizzük a változásokat
    component.navigate();

    // Ellenőrizzük, hogy a page értéke "registration"-ra változott
    expect(component.page).toBe('registration');

    // Ellenőrizzük, hogy a navigateToNewPage-t a "registration" paraméterrel hívták meg
    expect(routerPlusMock.navigateToNewPage).toHaveBeenCalledWith(
      'registration'
    );

    // Hívjuk meg még egyszer a navigate metódust
    component.navigate();

    // Ellenőrizzük, hogy a page értéke "login"-ra változott
    expect(component.page).toBe('login');

    // Ellenőrizzük, hogy a navigateToNewPage-t a "login" paraméterrel hívták meg
    expect(routerPlusMock.navigateToNewPage).toHaveBeenCalledWith('login');
  });
});
