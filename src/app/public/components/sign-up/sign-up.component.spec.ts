import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { UserService } from '../../../shared/services/user.service';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';
import { PopupService } from '../../../shared/services/popup.service';
import { Dialog } from '../../../shared/interfaces/dialog';
import { user } from '../../../shared/interfaces/user';
import { Timestamp } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
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
      'createNewUser',
      'userRegistration',
      'login',
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
      imports: [SignUpComponent, BrowserAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: NavigateAndurlinfoService, useValue: navigationServiceMock },
        { provide: PopupService, useValue: popupServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
  });

  describe('Basic tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('loaded should be false', () => {
      expect(component.loaded).toBeFalsy();
    });

    it('should have invalid signup form initially', () => {
      expect(component['signupForm'].valid).toBeFalse();
    });

    it('loaded should be switch true', () => {
      component.ngOnInit();
      expect(component.loaded).toBeTruthy();
    });
  });

  describe('isValid Function has right return value when:', () => {
    beforeEach(() => {
      component['signupForm'].setValue({
        firstName: 'Elek',
        lastName: 'lastname',
        city: 'Tesztváros',
        telNum: '0606060606',
        email: 'teszt@gmail.com',
        password: '123456',
        rePassword: '123456',
      });
    });

    it('Every field are valid', () => {
      expect(component.isValidForm()).toEqual({
        valid: true,
        passwords: true,
      });
    });

    it('password is empty', () => {
      component['signupForm'].get('password')!.setValue('');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: false,
      });
    });

    it('rePassword is empty', () => {
      component['signupForm'].get('rePassword')!.setValue('');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: false,
      });
    });
    it('password is short and not equal to repassword', () => {
      component['signupForm'].get('password')!.setValue('123');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: false,
      });
    });

    it('rePassword is short and not equal to password', () => {
      component['signupForm'].get('rePassword')!.setValue('123');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: false,
      });
    });
    it('password and rePassword are short and they are equal', () => {
      component['signupForm'].get('password')!.setValue('123');
      component['signupForm'].get('rePassword')!.setValue('123');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: true,
      });
    });

    it('email has wrong format', () => {
      component['signupForm'].get('email')!.setValue('valamiemail');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: true,
      });
    });

    it('email is empty', () => {
      component['signupForm'].get('email')!.setValue('');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: true,
      });
    });

    it('telNumber is empty', () => {
      component['signupForm'].get('telNum')!.setValue('');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: true,
      });
    });

    it('firstName is empty', () => {
      component['signupForm'].get('firstName')!.setValue('');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: true,
      });
    });

    it('lastName is empty', () => {
      component['signupForm'].get('lastName')!.setValue('');
      expect(component.isValidForm()).toEqual({
        valid: false,
        passwords: true,
      });
    });
  });

  describe('createUserObject function works', () => {
    let actualUserObject: user;

    beforeEach(() => {
      component['signupForm'].setValue({
        firstName: 'Elek',
        lastName: 'lastname',
        city: '',
        telNum: '0606060606',
        email: 'teszt@gmail.com',
        password: '123456',
        rePassword: '123456',
      });

      ///ez fontos rész
      const fixedNow = Timestamp.now();
      spyOn(Timestamp, 'now').and.returnValue(fixedNow);
      actualUserObject = component.createUserObject();
    });

    it("createUserObject's id need to be 'temporary id' ", () => {
      expect(actualUserObject.id).toEqual('temporary id');
    });

    it("createUserObject's firstName need to be equal with signupForm's firstName ", () => {
      expect(actualUserObject.firstName).toEqual(
        component['signupForm'].get('firstName')!.value!
      );
    });

    it("createUserObject's lastName need to be equal with signupForm's lastName ", () => {
      expect(actualUserObject.lastName).toEqual(
        component['signupForm'].get('lastName')!.value!
      );
    });

    it("createUserObject's telNumber need to be equal with signupForm's telNum ", () => {
      expect(actualUserObject.telNumber).toEqual(
        component['signupForm'].get('telNum')!.value!
      );
    });

    it("createUserObject's email need to be equal with signupForm's email ", () => {
      expect(actualUserObject.email).toEqual(
        component['signupForm'].get('email')!.value!
      );
    });

    it("createUserObject's city need to be equal with signupForm's city ", () => {
      expect(actualUserObject.city).toEqual(
        component['signupForm'].get('city')!.value!
      );
    });

    it("createUserObject's lastLogin", () => {
      expect(actualUserObject.lastLogin).toEqual(Timestamp.now());
    });

    it("createUserObject's dateOfRegistration", () => {
      expect(actualUserObject.dateOfRegistration).toEqual(Timestamp.now());
    });
  });

  describe('check function', () => {
    it('check when isValidForm returns with wrong value', () => {
      spyOn(component, 'isValidForm').and.returnValue({
        valid: true,
        passwords: false,
      });
      component.check();
      const popupArgs =
        popupServiceMock.displayPopUp.calls.mostRecent().args[0];
      expect(popupArgs.title).toEqual('Nem megegyező jelszavak!');
      expect(popupArgs.content).toEqual(
        'Nézd át a két jelszó mezőt, mert nem egyeznek meg'
      );
    });

    it('check when isValidForm returns with right value', () => {
      spyOn(component, 'isValidForm').and.returnValue({
        valid: true,
        passwords: true,
      });
      spyOn(component, 'registration');
      spyOn(component, 'createUserObject');
      component.check();
      expect(component.registration).toHaveBeenCalled();
      expect(component.createUserObject).toHaveBeenCalled();
    });
  });

  describe('registration function', () => {
    beforeEach(() => {
      component['signupForm'].setValue({
        firstName: 'Elek',
        lastName: 'lastname',
        city: '',
        telNum: '0606060606',
        email: 'teszt@gmail.com',
        password: '123456',
        rePassword: '123456',
      });

      popupServiceMock.getTemplateDialog.and.returnValue({ ...basicDialog });
      ///ez fontos rész
      spyOn(localStorage, 'setItem');
    });

    describe('valid form', () => {
      it('registration function have been called', async () => {
        spyOn(component, 'registration');
        await component.check();
        expect(component.registration).toHaveBeenCalled();
      });

      it('userRegistration', async () => {
        userServiceMock.userRegistration.and.returnValue(
          Promise.resolve({ user: { uid: 'ilEc8ARQiVUiOWGS6fLDjoHGfrJ3' } })
        );
        await component.check();
        expect(userServiceMock.userRegistration).toHaveBeenCalled();
      });

      it('createNewUser', async () => {
        userServiceMock.userRegistration.and.returnValue(
          Promise.resolve({ user: { uid: 'ilEc8ARQiVUiOWGS6fLDjoHGfrJ3' } })
        );
        await component.check();
        expect(userServiceMock.createNewUser).toHaveBeenCalled();
      });

      it('login function valid when createNewUser is valid', async () => {
        userServiceMock.userRegistration.and.returnValue(
          Promise.resolve({ user: { uid: 'ilEc8ARQiVUiOWGS6fLDjoHGfrJ3' } })
        );
        userServiceMock.createNewUser.and.returnValue(Promise.resolve());
        await component.check();
        await fixture.whenStable();
        expect(userServiceMock.createNewUser).toHaveBeenCalled();
        expect(userServiceMock.login).toHaveBeenCalledWith(
          component['signupForm'].get('email')!.value!,
          component['signupForm'].get('password')!.value!
        );
      });

      it('login function valid when createNewUser is not valid', async () => {
        userServiceMock.userRegistration.and.returnValue(
          Promise.resolve({ user: { uid: 'ilEc8ARQiVUiOWGS6fLDjoHGfrJ3' } })
        );
        userServiceMock.createNewUser.and.returnValue(Promise.reject());
        await component.check();
        await fixture.whenStable();
        expect(userServiceMock.createNewUser).toHaveBeenCalled();
        expect(userServiceMock.login).not.toHaveBeenCalled();
        expect(userServiceMock.login).not.toHaveBeenCalledWith(
          component['signupForm'].get('email')!.value!,
          component['signupForm'].get('password')!.value!
        );
      });
    });
  });
});
