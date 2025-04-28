import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { CollectionService } from '../../../shared/services/collection.service';
import { ArrayService } from '../../services/array.service';
import { PopupService } from '../../../shared/services/popup.service';
import { FormGroup } from '@angular/forms';
import { user } from '../../../shared/interfaces/user';

fdescribe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let collectionServiceMock: jasmine.SpyObj<CollectionService>;
  let arrayServiceMock: jasmine.SpyObj<ArrayService>;
  let popupServiceMock: jasmine.SpyObj<PopupService>;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', [
      'getUserInfoByUserId',
      'isOldPasswordCorrect',
      'currentUser',
    ]);

    collectionServiceMock = jasmine.createSpyObj('CollectionService', [
      'getCollectionByCollectionAndDoc',
      'getAllDocByCollectionName',
      'updateDatas',
      '',
    ]);

    arrayServiceMock = jasmine.createSpyObj('ArrayService', [
      'elementInArrayTimes',
    ]);

    popupServiceMock = jasmine.createSpyObj('PopupService', [
      'getTemplateDialog',
      'displayDialog',
    ]);

    await TestBed.configureTestingModule({
      imports: [AccountComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: CollectionService, useValue: collectionServiceMock },
        { provide: ArrayService, useValue: arrayServiceMock },
        { provide: PopupService, useValue: popupServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  });

  describe('Before onInit', () => {
    describe('Services', () => {
      it('userService is defined', () => {
        expect(component['userService']).toBeDefined();
      });

      it('collectionService is defined', () => {
        expect(component['collectionService']).toBeDefined();
      });

      it('arrayService is defined', () => {
        expect(component['arrayService']).toBeDefined();
      });

      it('popupService is defined', () => {
        expect(component['popupService']).toBeDefined();
      });
    });

    describe('Global varibles', () => {
      it('_actualUser is undefined', () => {
        expect(component['_actualUser']).not.toBeDefined();
      });

      it('loaded is undefined (false)', () => {
        expect(component['loaded']).toBeDefined();
        expect(component['loaded']).toBeFalse();
      });

      it('keyTransleater is defined', () => {
        expect(component['keyTransleater']).toBeDefined();
      });
      it('keyArray is defined', () => {
        expect(component['keyArray']).toBeDefined();
        expect(component['keyArray']).toEqual([]);
      });

      it('myWorksArray is defined', () => {
        expect(component['myWorksArray']).toBeDefined();
        expect(component['myWorksArray']).toEqual([]);
      });
      it('userInWorks is defined', () => {
        expect(component['userInWorks']).toBeDefined();
        expect(component['userInWorks']).toEqual([]);
      });
      it('displayDatas is defined (false)', () => {
        expect(component['displayDatas']).toBeDefined();
        expect(component['displayDatas']).toBeFalse();
      });
      it('modifyKeyValueObj is defined', () => {
        expect(component['modifyKeyValueObj']).toBeDefined();
      });
      it('displayForm is defined (false)', () => {
        expect(component['displayForm']).toBeDefined();
        expect(component['displayForm']).toBeFalse();
      });
      it('modifyForm is defined', () => {
        expect(component['modifyForm']).toBeDefined();
        expect(component['modifyForm']).toBeInstanceOf(FormGroup);
      });
    });
  });

  describe('Functions', () => {
    it('getObjectInArray works', () => {
      const testObject: object = { key1: 'value1', key2: 'value2' };
      expect(component.getObjectInArray(testObject)[0]).toEqual([
        'key1',
        'value1',
      ]);
      expect(component.getObjectInArray(testObject)[1]).toEqual([
        'key2',
        'value2',
      ]);
    });

    it('orderKeyArray', () => {
      const order: Array<string> = [
        'lastName',
        'firstName',
        'email',
        'gender',
        'telNumber',
        'city',
        'lastLogin',
        'dateOfRegistration',
      ];

      const randomArray: Array<string> = [
        'dateOfRegistration',
        'email',
        'telNumber',
        'lastLogin',
        'lastName',
        'city',
        'firstName',
        'gender',
      ];
      component.orderKeyArray(randomArray, order);
      expect(component.keyArray).toEqual([...order] as Array<keyof user>);
    });
  });
});
