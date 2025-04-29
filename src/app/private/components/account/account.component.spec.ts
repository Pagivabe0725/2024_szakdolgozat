import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { CollectionService } from '../../../shared/services/collection.service';
import { ArrayService } from '../../services/array.service';
import { PopupService } from '../../../shared/services/popup.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from '../../../shared/interfaces/user';
import { Timestamp } from '@angular/fire/firestore';
import {
  userTemplate,
  workTemplate,
  accountButtonActionsTemplate,
} from '../../../shared/template/testTemplates';
import { firstValueFrom, of } from 'rxjs';
import { work } from '../../../shared/interfaces/work';
function randomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

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
    it('getObjectInArray works should work', () => {
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

    describe('createWorkMatCardObject should work', () => {
      const getWorksNumber = randomNumber(100);
      const date: Timestamp = Timestamp.now();
      let expectedArray: Array<Array<any>>;
      beforeEach(() => {
        spyOn(component, 'getWorksNumber').and.returnValue(getWorksNumber);
        expectedArray = [
          ['Saját munkáim:'],
          ['Munkák amiben részt veszek:'],
          ['Utojára létrehozott munkám:'],
          ['Utojára módosított munkám:'],
        ];
      });
      function generateArray(undef: boolean): Array<Array<any>> {
        spyOn(component, 'lastProject').and.returnValue(
          undef ? undefined : date
        );
        spyOn(component, 'lastModifiedProject').and.returnValue(
          undef ? undefined : date
        );
        return component.createWorkMatCardObject();
      }
      function setExpectedArray(undef: boolean) {
        for (let i = 0; i < expectedArray.length; i++) {
          if (i < 2) {
            expectedArray[i].push(getWorksNumber);
          } else {
            expectedArray[i].push(undef ? 'Nincs' : date);
          }
        }
      }
      it('createWorkMatCardObject when its subfunctions work correctly', () => {
        const array: Array<Array<any>> = generateArray(false);
        setExpectedArray(false);
        array.forEach((i, index) => {
          expect(i).toEqual(expectedArray[index]);
        });
      });

      it('createWorkMatCardObject when its subfunctions work incorrectly', () => {
        const array: Array<Array<any>> = generateArray(true);
        setExpectedArray(true);
        array.forEach((i, index) => {
          expect(i[0]).toEqual(expectedArray[index][0]);
        });
      });
    });

    it('transformStringToKey should work', () => {
      const random = randomNumber(1000) + '';
      const keyArray: Array<string> = Object.keys(userTemplate);
      keyArray.forEach((i) => {
        expect(i).toEqual(component.transformStringToKey(i));
      });

      expect(keyArray.includes(random)).toBeFalse();
    });

    describe('isDarkmode', () => {
      function setGetItem(dark: boolean) {
        spyOn(localStorage, 'getItem').and.returnValue(dark ? 'dark' : 'light');
      }

      it('should be true', () => {
        setGetItem(true);
        expect(component.isDarkmode()).toBeTrue();
      });

      it('should be false', () => {
        setGetItem(false);
        expect(component.isDarkmode()).toBeFalse();
      });

      it('theme is undefined', () => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
        expect(component.isDarkmode()).toBeFalse();
      });
    });

    it('isTimestamp should work', () => {
      const timestamp: Timestamp = Timestamp.now();
      const anyOherValueType: any[] = [
        1,
        'something',
        true,
        {},
        [],
        null,
        undefined,
        Symbol('unique'),
        1234567890123456789012345678901234567890n,
        new Date(),
        /regex/,
        function () {
          console.log('Function example');
        },
      ];
      expect(component.isTimestamp(timestamp)).toBeTrue();
      anyOherValueType.forEach((type) => {
        expect(component.isTimestamp(type)).toBeFalse();
      });
    });

    describe('should handle async functions correctly', () => {
      let workTemplate2 = structuredClone(workTemplate);
      workTemplate2.userId = 'userId2';
      workTemplate2.author.id = 'userId2';
      workTemplate2.id = '2';
      beforeEach(() => {
        collectionServiceMock.getAllDocByCollectionName.and.returnValue(
          of({
            doc: {
              id: ['workId', 'workId2'],
            },
          })
        );

        collectionServiceMock.getCollectionByCollectionAndDoc.and.callFake(
          (collection, path) => {
            if (path == 'workId') {
              return of({ ...workTemplate });
            } else {
              return of({ ...workTemplate2 });
            }
          }
        );

        userServiceMock.getUserInfoByUserId.and.returnValue(
          of({ ...userTemplate })
        );
      });

      describe('Functions related to fetching works', () => {
        let expectedDocsObject: { doc: { id: Array<string> } };
        beforeEach(async () => {
          expectedDocsObject = (await component.getDocsObj()) as {
            doc: { id: Array<string> };
          };
        });

        it('getDocsObj should work', async () => {
          expect(expectedDocsObject['doc']['id']).toEqual([
            'workId',
            'workId2',
          ]);
        });

        it('getWorks should works', async () => {
          for (const id of expectedDocsObject.doc.id) {
            const actualElement: work = (await component.getWorks(
              id.trim()
            )) as work;
            expect(actualElement).toEqual(
              actualElement.id === 'workId'
                ? { ...workTemplate }
                : { ...workTemplate2 }
            );
          }
        });
      });

      describe('getActualUser', () => {
        beforeAll(() => {
          spyOn(localStorage, 'getItem').and.returnValue('userId');
        });

        it('getActualUser should work', async () => {
          await component.getActualUser();
          expect(component['_actualUser']).toEqual({ ...userTemplate });
          expect(component['keyArray']).toEqual([
            'lastName',
            'firstName',
            'email',
            'gender',
            'telNumber',
            'city',
            'lastLogin',
            'dateOfRegistration',
          ]);
        });
      });
    });
    describe('lastProject and lastModifiedProject functions', () => {
      const timestamp1999 = Timestamp.fromDate(
        new Date('1999-01-01T00:00:00Z')
      );
      const timestamp2009 = Timestamp.fromDate(
        new Date('2009-01-01T00:00:00Z')
      );
      const timestamp2019 = Timestamp.fromDate(
        new Date('2019-01-01T00:00:00Z')
      );

      beforeEach(() => {
        component['myWorksArray'] = [
          { ...workTemplate },
          { ...workTemplate },
          { ...workTemplate },
        ];
      });
      it('lastProject when workArray is empty', () => {
        component['myWorksArray'] = [];
        expect(component.lastProject()).not.toBeDefined();
      });

      it('lastProject when myWorksArray is not empty', () => {
        component['myWorksArray'][2].created = timestamp1999;
        component['myWorksArray'][0].created = timestamp2009;
        component['myWorksArray'][1].created = timestamp2019;

        expect(component.lastProject()).toEqual(timestamp2019);
      });

      it('lastModifiedProject when myWorksArray is empty', () => {
        component['myWorksArray'] = [];
        expect(component.lastModifiedProject()).not.toBeDefined();
      });

      it('lastModifiedProject when myWorksArray is not empty', () => {
        component['myWorksArray'][2].modified = timestamp1999;
        component['myWorksArray'][0].modified = timestamp2009;
        component['myWorksArray'][1].modified = timestamp2019;

        expect(component.lastModifiedProject()).toEqual(timestamp2019);
      });
    });

    describe('Form functions', () => {
      async function handleAction(text: string) {
        await component.buttonAction(text);
        await new Promise((resolve) => {
          setTimeout(resolve, 15);
        });
      }
      it('buttonAction should work', async () => {
        for (const i of accountButtonActionsTemplate) {
          await handleAction(i);
          const formControlKeys: Array<string> = Object.keys(
            component['modifyForm'].controls
          ).sort();
          if (i === 'password') {
            expect(formControlKeys).toEqual(
              ['password', 'newPassword', 'newPasswordAgain'].sort()
            );
            expect(component['displayForm']).toBeTrue();
          } else if (i === 'back') {
            expect(formControlKeys).toEqual([]);
            expect(component['displayForm']).toBeFalse();
          } else {
            expect(formControlKeys).toEqual([i]);
            expect(component['displayForm']).toBeTrue();
          }
        }
      });

      it('stringInActualFormcontrolKeys should work', async () => {
        const rightOptions: Array<string> = [
          'password',
          'newPassword',
          'newPasswordAgain',
        ];
        const badOptions: Array<string> = ['1', '2', '3', '4'];

        await handleAction('password');

        rightOptions.forEach((i) => {
          expect(component.stringInActualFormcontrolKeys(i)).toBeTrue();
        });
        badOptions.forEach((i) => {
          expect(component.stringInActualFormcontrolKeys(i)).toBeFalse();
        });
      });

      it('getElementsFromFormcontrol should work', async () => {
        await handleAction('password');
        expect(component.getElementsFromFormcontrol()).toBeTruthy();
        expect(component.getElementsFromFormcontrol()).toBeInstanceOf(
          Array<FormControl>
        );
        await handleAction('back');
        expect(component.getElementsFromFormcontrol()).toEqual([]);
      });

      it('labelForMatFormField should work', async () => {
        let testArray: Array<string> = [...accountButtonActionsTemplate].filter(
          (i) => !['email', 'lastLogin', 'dateOfRegistration'].includes(i)
        );
        for (const element of testArray) {
          if (element !== 'back') {
            await handleAction(element);
            const elementArray = component.getElementsFromFormcontrol();

            elementArray.forEach((i) => {
              expect(component.labelForMatFormField(i)).not.toEqual('');
            });
          }
        }
        expect(
          component.labelForMatFormField('should_be_empty_string')
        ).toEqual('');
      });

      it('checkForm should work', async () => {
        component['modifyForm'].addControl(
          'lastName',
          new FormControl('', Validators.required)
        );
        expect(component.checkForm()).toBeFalse();
        component['modifyForm'].removeControl('lastName');
        component['modifyForm'].addControl(
          'lastName',
          new FormControl('Something', Validators.required)
        );
        expect(component.checkForm()).toBeTrue();
      });

      it('handlePageStates should work', async () => {
        /*
        this.modifyForm = new FormGroup({});
        this.displayForm = false;
        this.displayDatas = false;
        this.loaded = true;
        this.displayDatas = true;*/
        await handleAction('password');
        component['displayForm'] = true;
        component['displayDatas'] = true;
        component['loaded'] = false;
        await component.handlePageStates();
        expect(component['displayForm']).toBeFalse();
        expect(component['displayDatas']).toBeTrue();
        expect(component['loaded']).toBeTrue();
        expect(component.getElementsFromFormcontrol()).toEqual([]);
      });
    });
  });
});
