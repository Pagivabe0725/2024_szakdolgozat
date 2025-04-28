import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { CollectionService } from '../../../shared/services/collection.service';
import { ArrayService } from '../../services/array.service';
import { PopupService } from '../../../shared/services/popup.service';

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
  });
});
