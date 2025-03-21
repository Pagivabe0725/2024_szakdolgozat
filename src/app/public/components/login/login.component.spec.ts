import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from '../../../shared/services/user.service';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';
import { PopupService } from '../../../shared/services/popup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from '../../../shared/interfaces/dialog';
import { user } from '../../../shared/interfaces/user';
import { Timestamp } from '@angular/fire/firestore';
import { of } from 'rxjs';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let navigationServiceMock: jasmine.SpyObj<NavigateAndurlinfoService>;
  let popupServiceMock: jasmine.SpyObj<PopupService>;
  let basicDialog: Dialog;
  let mockUserCredential: user = {
    firstName: 'Elek',
    lastName: 'lastname',
    city: 'Tesztváros',
    telNumber: '0606060606',
    email: 'teszt@gmail.com',
    id: 'ilEc8ARQiVUiOWGS6fLDjoHGfrJ3',
    dateOfRegistration: Timestamp.fromDate(
      new Date('November 30, 2024 at 10:47:27 PM UTC+1')
    ),
    lastLogin: Timestamp.fromDate(
      new Date('December 1, 2024 at 5:54:24 PM UTC+1')
    ),
  };

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', [
      'login',
      'getUserInfoByUserId',
      'updateUser',
    ]);
    navigationServiceMock = jasmine.createSpyObj('NavigateAndurlinfoService', [
      'navigate',
    ]);
    popupServiceMock = jasmine.createSpyObj('PopupService', [
      'getTemplateDialog',
      'displayPopUp',
    ]);
    basicDialog = {
      width: '70%',
      height: '70%',
      hostComponent: 'LoginComponent',
      title: '',
      content: '',
      action: false,
      hasInput: false,
    };

    popupServiceMock.getTemplateDialog.and.returnValue({ ...basicDialog });

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: NavigateAndurlinfoService, useValue: navigationServiceMock },
        { provide: PopupService, useValue: popupServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  describe('Basic tests:', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('loaded should be false', () => {
      expect(component.loaded).toBeFalsy();
    });

    it('loaded should be switch true', () => {
      component.ngOnInit();
      expect(component.loaded).toBeTruthy();
    });

    it('should not call login if form is invalid', () => {
      component.loginForm.setValue({ email: '', password: '' }); // Invalid form
      expect(userServiceMock.login).not.toHaveBeenCalled();
    });

    it('should mark form as invalid if fields are empty', () => {
      component.loginForm.setValue({ email: '', password: '' });
      expect(component.loginForm.valid).toBeFalse();
    });

    it('should unsubscribe from userValuesChangesService on destroy', async () => {
      await fixture.whenStable();
      component['userValuesChangesService'] = jasmine.createSpyObj(
        'Subscription',
        ['unsubscribe']
      );
      component.ngOnDestroy();
      expect(
        component['userValuesChangesService']!.unsubscribe
      ).toHaveBeenCalled();
    });
  });

  describe('Functions after succsessful login:', () => {
    beforeEach(async () => {
      component.loginForm.setValue({
        email: 'teszt@gmail.com',
        password: '123456',
      });
      userServiceMock.login.and.returnValue(
        Promise.resolve({ user: { uid: mockUserCredential.id } })
      );
      userServiceMock.getUserInfoByUserId.and.returnValue(
        of(mockUserCredential)
      );
      userServiceMock.updateUser.and.returnValue(Promise.resolve());
      spyOn(localStorage, 'setItem');
      navigationServiceMock.navigate.and.stub();
      await component.login();
    });

    it('loaded should be false', () => {
      expect(component.loaded).toBeFalsy();
    });

    it('login', () => {
      expect(userServiceMock.login).toHaveBeenCalledWith(
        'teszt@gmail.com',
        '123456'
      );
    });

    it('getUserInfoByUserId', () => {
      expect(userServiceMock.getUserInfoByUserId).toHaveBeenCalled();
    });
    it('updateUser', () => {
      expect(userServiceMock.updateUser).toHaveBeenCalled();
    });

    it('navigate', () => {
      expect(navigationServiceMock.navigate).toHaveBeenCalledOnceWith(
        true,
        'main'
      );
    });

    it('should save userId to localStorage after successful login', () => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'userId',
        mockUserCredential.id
      );
    });
    it('should be userValuesChangesSuscription', async () => {
      await fixture.whenStable();
      expect(component.userValuesChangesSuscription).toBeTruthy();
    });

    it('should be unsubsrcribe from userValuesChangesService on destroy', async () => {
      await fixture.whenStable();
      component['userValuesChangesService'] = jasmine.createSpyObj(
        'Subscription',
        ['unsubscribe']
      );
      component.ngOnDestroy();
      expect(
        component['userValuesChangesService']!.unsubscribe
      ).toHaveBeenCalled();
    });
  });

  describe('Functions after failed login', () => {
    beforeEach(async () => {
      component.loginForm.setValue({
        email: 'teszt@gmail.com',
        password: '123456',
      });
      userServiceMock.login.and.returnValue(
        Promise.resolve({ user: { uid: mockUserCredential.id } })
      );
      userServiceMock.updateUser.and.returnValue(Promise.reject());
      popupServiceMock.displayPopUp.and.stub();
      userServiceMock.getUserInfoByUserId.and.returnValue(
        of(mockUserCredential)
      );
      navigationServiceMock.navigate.and.stub();
      await component.login();
    });

    it('login was invite', () => {
      expect(userServiceMock.login).toHaveBeenCalledWith(
        'teszt@gmail.com',
        '123456'
      );
    });

    it('getUserInfoByUserId function was invite', () => {
      expect(userServiceMock.getUserInfoByUserId).toHaveBeenCalled();
    });

    it('popup was invite', async () => {
      await fixture.whenStable();
      expect(popupServiceMock.displayPopUp).toHaveBeenCalled();
    });

    it('should set loaded to true after login failure', async () => {
      await fixture.whenStable();
      expect(component.loaded).toBeTruthy();
    });
    it('should display correct error message in popup', async () => {
      await fixture.whenStable();

      expect(popupServiceMock.displayPopUp).toHaveBeenCalled();

      //Kinyerjük az utoljára hívott popup adatait
      const popupArgs =
        popupServiceMock.displayPopUp.calls.mostRecent().args[0];

      //Ellenőrizzük a popup tartalmát
      expect(popupArgs.title).toBe('hiba!');
      expect(popupArgs.content).toContain(
        'Hiba történt a bejelentkezési folyamat során. Próbáld újra'
      );
    });

    it('should not navigate after failed login', async () => {
      await fixture.whenStable();
      expect(navigationServiceMock.navigate).not.toHaveBeenCalled();
    });

    it('should be unsubsrcribe from userValuesChangesService on destroy', async () => {
      await fixture.whenStable();
      component['userValuesChangesService'] = jasmine.createSpyObj(
        'Subscription',
        ['unsubscribe']
      );
      component.ngOnDestroy();
      expect(
        component['userValuesChangesService']!.unsubscribe
      ).toHaveBeenCalled();
    });
  });

  describe('Functions after bad prompt', () => {
    beforeEach(async () => {
      component.loginForm.setValue({
        email: 'rosszteszt@gmail.com',
        password: '123456',
      });
      userServiceMock.login.and.returnValue(Promise.reject());
      popupServiceMock.displayPopUp.and.stub();
      await component.login();
    });

    it('popup was invite', () => {
      expect(popupServiceMock.displayPopUp).toHaveBeenCalled();
    });

    it('should display correct error message in popup', async () => {
      await fixture.whenStable();

      expect(popupServiceMock.displayPopUp).toHaveBeenCalled();

      //Kinyerjük az utoljára hívott popup adatait
      const popupArgs =
        popupServiceMock.displayPopUp.calls.mostRecent().args[0];

      //Ellenőrizzük a popup tartalmát
      expect(popupArgs.title).toBe('hiba!');
      expect(popupArgs.content).toContain(
        'Valószinüleg hibás az email vagy a jelszó'
      );
    });
    it('should not navigate after failed login', async () => {
      await fixture.whenStable();
      expect(navigationServiceMock.navigate).not.toHaveBeenCalled();
    });
    it('should set loaded to true after failed login attempt', async () => {
      await fixture.whenStable();
      expect(component.loaded).toBeTrue();
    });
    it('should be unsubsrcribe from userValuesChangesService on destroy', async () => {
      await fixture.whenStable();
      component['userValuesChangesService'] = jasmine.createSpyObj(
        'Subscription',
        ['unsubscribe']
      );
      component.ngOnDestroy();
      expect(
        component['userValuesChangesService']!.unsubscribe
      ).toHaveBeenCalled();
    });
  });
});
