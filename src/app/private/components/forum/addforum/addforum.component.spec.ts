import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { CollectionService } from '../../../../shared/services/collection.service';
import { Dialog } from '../../../../shared/interfaces/dialog';
import { PopupService } from '../../../../shared/services/popup.service';
import { AddforumComponent } from './addforum.component';
import { UserService } from '../../../../shared/services/user.service';
import { user } from '../../../../shared/interfaces/user';
import { author } from '../../../../shared/Functions/author';
import { of } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const dialogTemplate: Dialog = {
  width: '70%',
  height: '70%',
  hostComponent: 'AddforumComponent',
  title: '',
  content: '',
  action: false,
  hasInput: false,
};

const userTemplate: user = {
  id: '1',
  firstName: 'firstName',
  lastName: 'lastName',
  lastLogin: Timestamp.now(),
  email: 'test@gmail.com',
  city: undefined,
  telNumber: '06905777170',
  dateOfRegistration: Timestamp.now(),
};

fdescribe('AddforumComponent', () => {
  let component: AddforumComponent;
  let fixture: ComponentFixture<AddforumComponent>;
  let collectionServiceMock: jasmine.SpyObj<CollectionService>;
  let navigateAndurlinfoServiceMock: jasmine.SpyObj<NavigateAndurlinfoService>;
  let popupServiceMock: jasmine.SpyObj<PopupService>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    collectionServiceMock = jasmine.createSpyObj('CollectionService', [
      'getCollectionByCollectionAndDoc',
      'createCollectionDoc',
    ]);
    navigateAndurlinfoServiceMock = jasmine.createSpyObj(
      'NavigateAndurlinfoService',
      ['navigate']
    );
    popupServiceMock = jasmine.createSpyObj('PopupService', [
      'getTemplateDialog',
      'displayPopUp',
    ]);
    userServiceMock = jasmine.createSpyObj('UserService', [
      'getUserInfoByUserId',
    ]);
    await TestBed.configureTestingModule({
      imports: [AddforumComponent, BrowserAnimationsModule],
      providers: [
        { provide: CollectionService, useValue: collectionServiceMock },
        {
          provide: NavigateAndurlinfoService,
          useValue: navigateAndurlinfoServiceMock,
        },
        { provide: PopupService, useValue: popupServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    popupServiceMock.getTemplateDialog.and.returnValue({ ...dialogTemplate });
    collectionServiceMock.getCollectionByCollectionAndDoc.and.returnValue(
      of({ 0: ['category1', 'category2'] })
    );
    userServiceMock.getUserInfoByUserId.and.returnValue(
      of({ ...userTemplate })
    );
    fixture = TestBed.createComponent(AddforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Basic state check', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('loaded should be true', () => {
      expect(component.loaded).toBeTruthy();
    });

    it('forumForm should be exist', () => {
      expect(component['forumForm']).toBeDefined();
      console.log(component['forumForm']);
    });

    it('categoryTitleArray should not be empty', () => {
      expect(component['categoryTitleArray']).toEqual([
        'category1',
        'category2',
      ]);
    });

    it('popupDialogTemplate should not be empty', () => {
      expect(component['popupDialogTemplate']).toEqual({ ...dialogTemplate });
    });

    it('fullName should not be correct', () => {
      expect(component['fullName']).toEqual(author(userTemplate));
      console.log(author(userTemplate));
    });
  });

  describe('Functions', () => {
    it('back function is correct', () => {
      const html: HTMLElement = fixture.nativeElement;
      const button = html.querySelector('#own-back-button');
      button!.dispatchEvent(new Event('click'));
      expect(navigateAndurlinfoServiceMock.navigate).toHaveBeenCalledOnceWith(
        true,
        'forum'
      );
    });

    it('clearFormFields function is correct', () => {
      component['forumForm'].get('category')?.setValue('category1');
      component['forumForm'].get('title')?.setValue('tester');
      component['forumForm']
        .get('content')
        ?.setValue(
          'it is a simple long text, because the it must be minimum 60 character'
        );
      component.clearFormFields();
      expect(component['forumForm'].get('category')!.value).toBeFalsy();
      expect(component['forumForm'].get('title')!.value).toBeFalsy();
      expect(component['forumForm'].get('content')!.value).toBeFalsy();
    });

    /*

    it('check function is correct', () => {
      component['forumForm'].get('category')?.setValue('category1');
      component['forumForm'].get('title')?.setValue('tester');
      component['forumForm']
        .get('content')
        ?.setValue(
          'it is a simple long text, because the it must be minimum 60 character'
        );

        component.check()
        expect(component['popupDialogTemplate'].title).toEqual('Hozzáadod?')
       

    });

    */
  });
});
