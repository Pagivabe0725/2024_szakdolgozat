import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from '../../../shared/services/user.service';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';
import { PopupService } from '../../../shared/services/popup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from '../../../shared/interfaces/dialog';
import { user } from '../../../shared/interfaces/user';
import { Timestamp } from '@angular/fire/firestore';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let navigationServiceMock: jasmine.SpyObj<NavigateAndurlinfoService>;
  let popupServiceMock: jasmine.SpyObj<PopupService>;
  let basicDialog: Dialog;
  const mockUserCredential: user = {
    firstName: 'firstname',
    lastName: 'lastname',
    city: '',
    telNumber: '0606060606',
    email: 'testemail@gmail.com',
    id: '123456',
    dateOfRegistration: Timestamp.now(),
    lastLogin: Timestamp.now(),
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
    component.login();
    expect(userServiceMock.login).not.toHaveBeenCalled();
  });

  it('should not call login if form is valid', () => {
    component.loginForm.setValue({
      email: 'test@gmail.com',
      password: 'alma123',
    }); // Invalid form
    //component.login();
    console.log(popupServiceMock.getTemplateDialog());
  });

  it('should set loaded to false and call login on valid form', async () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });
    userServiceMock.login.and.returnValue(Promise.resolve(mockUserCredential));

    await component.login();

    expect(component.loaded).toBeFalse();
    expect(userServiceMock.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  });
});
