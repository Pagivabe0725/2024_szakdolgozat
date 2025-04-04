import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumElementInfoComponent } from './forum-element-info.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { PopupService } from '../../../../shared/services/popup.service';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { UserService } from '../../../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialog } from '../../../../shared/interfaces/dialog';
import { of } from 'rxjs';
import { forum } from '../../../../shared/interfaces/forum';
import { Timestamp } from '@angular/fire/firestore';
import { user } from '../../../../shared/interfaces/user';
import { ArrayService } from '../../../services/array.service';

const dialogTemplate: Dialog = {
  width: '70%',
  height: '70%',
  hostComponent: 'ForumElementInfoComponent',
  title: '',
  content: '',
  action: false,
  hasInput: false,
};

const forumTemplate: forum = {
  title: 'first',
  id: '1',
  userId: '1',
  text: 'It is a test text',
  author: 'Tester',
  date: Timestamp.now(),
  commentsIdArray: [],
  dislikeArray: [],
  likeArray: [],
  category: 'category1',
};

const userTemplate: user = {
  id: 'UserId',
  firstName: 'firstName',
  lastName: 'lastName',
  lastLogin: Timestamp.now(),
  email: 'test@gmail.com',
  city: undefined,
  telNumber: '06905777170',
  dateOfRegistration: Timestamp.now(),
};

fdescribe('ForumElementInfoComponent', () => {
  let component: ForumElementInfoComponent;
  let fixture: ComponentFixture<ForumElementInfoComponent>;
  let collectionServiceMock: jasmine.SpyObj<CollectionService>;
  let popupServiceMock: jasmine.SpyObj<PopupService>;
  let navigationServiceMock: jasmine.SpyObj<NavigateAndurlinfoService>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let arrayServiceMock: jasmine.SpyObj<ArrayService>;
  //let ActivatedRouteMock: jasmine.SpyObj<ActivatedRoute>;

  /*
  private collectionService: CollectionService,
  private popupService: PopupService,
  private navigationService: NavigateAndurlinfoService,
  private arrayService: ArrayService,
  private userService: UserService
*/

  beforeEach(async () => {
    collectionServiceMock = jasmine.createSpyObj('collectionService', [
      'getCollectionByCollectionAndDoc',
      'updateDatas',
      'deleteDatas',
      'createCollectionDoc',
    ]);
    popupServiceMock = jasmine.createSpyObj('PopupService', [
      'getTemplateDialog',
      'displayPopUp',
    ]);
    navigationServiceMock = jasmine.createSpyObj('NavigateAndurlinfoService', [
      'navigate',
    ]);
    userServiceMock = jasmine.createSpyObj('UserService', [
      'getUserInfoByUserId',
    ]);

    arrayServiceMock = jasmine.createSpyObj('arrayService', ['elementInArray']);

    await TestBed.configureTestingModule({
      imports: [ForumElementInfoComponent, CommonModule],
      providers: [
        { provide: CollectionService, useValue: collectionServiceMock },
        { provide: PopupService, useValue: popupServiceMock },
        { provide: NavigateAndurlinfoService, useValue: navigationServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: ArrayService, useValue: arrayServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ forumId: 'forumId123' }) },
        },
      ],
    }).compileComponents();

    popupServiceMock.getTemplateDialog.and.returnValue({ ...dialogTemplate });

    fixture = TestBed.createComponent(ForumElementInfoComponent);
    component = fixture.componentInstance;
  });

  describe('Before onInit', () => {
    it('httpSub should be undefined', () => {
      expect(component['httpSub']).not.toBeDefined();
    });

    it('actualForumId should be undefined', () => {
      expect(component['actualForumId']).not.toBeDefined();
    });

    it('forumSub should be undefined', () => {
      expect(component['forumSub']).not.toBeDefined();
    });
    it('popupSub should be undefined', () => {
      expect(component['popupSub']).not.toBeDefined();
    });
    it('userSub should be undefined', () => {
      expect(component['userSub']).not.toBeDefined();
    });
    it('dialogSub should be undefined', () => {
      expect(component['dialogSub']).not.toBeDefined();
    });
    it('actualForumElement should be undefined', () => {
      expect(component['actualForumElement']).not.toBeDefined();
    });
    it('popupDialogTemplate should be defined', () => {
      expect(component['popupDialogTemplate']).toBeDefined();
      expect(component['popupDialogTemplate']).toEqual({ ...dialogTemplate });
    });

    it('actualUser should be undefined', () => {
      expect(component['actualUser']).not.toBeDefined();
    });
    it('loaded should be undefined', () => {
      expect(component['loaded']).toBeFalse();
    });
  });

  describe('Basics', () => {
    beforeEach(() => {
      fixture.detectChanges();

      collectionServiceMock.getCollectionByCollectionAndDoc.and.returnValue(
        of({ ...forumTemplate })
      );
      userServiceMock.getUserInfoByUserId.and.returnValue(
        of({ ...userTemplate })
      );
      popupServiceMock.getTemplateDialog.and.returnValue({ ...dialogTemplate });
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('httpSub should be defined', () => {
      expect(component['httpSub']).toBeDefined();
    });

    it('actualForumId should be defined', () => {
      expect(component['actualForumId']).toBeDefined();
    });

    it('forumSub should be defined', async () => {
      await component.ngOnInit();
      console.log(component['forumSub']);
      expect(component['forumSub']).toBeDefined();
    });

    it('userSub should be defined', async () => {
      await component.ngOnInit();
      expect(component['userSub']).toBeDefined();
    });

    it('actualForumElement should be defined', async () => {
      await component.ngOnInit();
      console.log(component['actualForumElement']);
      expect(component['actualForumElement']).toBeDefined();
    });
    it('actualUser should be defined', async () => {
      await component.ngOnInit();
      expect(component['actualUser']).toBeDefined();
    });

    it('loaded should be defined', async () => {
      await component.ngOnInit();
      expect(component['loaded']).toBeTrue();
    });
  });

  describe('Functions:', () => {
    describe('isDarkmode', () => {
      it('should return false from isDarkmode if theme is not dark', () => {
        spyOn(localStorage, 'getItem').and.returnValue('light');
        expect(component.isDarkmode()).toBeFalse();
      });
      it('should return false from isDarkmode if theme is not dark (empty theme)', () => {
        spyOn(localStorage, 'getItem').and.returnValue('');
        expect(component.isDarkmode()).toBeFalse();
      });

      it('should return true from isDarkmode if theme is dark', () => {
        spyOn(localStorage, 'getItem').and.returnValue('dark-something');
        expect(component.isDarkmode()).toBeTrue();
      });
    });

    describe('didYouInteractWithThis', () => {
      let forumTemplate2: forum;
      beforeEach(() => {
        arrayServiceMock.elementInArray.and.callFake((element, array) =>
          array.includes(element)
        );
        spyOn(localStorage, 'getItem').and.returnValue('UserId');
        forumTemplate2 = {
          title: 'first',
          id: '1',
          userId: '1',
          text: 'It is a test text',
          author: 'Tester',
          date: Timestamp.now(),
          commentsIdArray: [],
          dislikeArray: ['UserId'],
          likeArray: ['UserId'],
          category: 'category1',
        };
      });

      it('should return true from didYouInteractWithThis if userId in likeArray', () => {
        component['actualForumElement'] = { ...forumTemplate2 };

        expect(component.didYouInteractWithThis('likeArray')).toBeTrue();
      });

      it('should return false from didYouInteractWithThis if userId not in likeArray', () => {
        component['actualForumElement'] = { ...forumTemplate };

        expect(component.didYouInteractWithThis('likeArray')).toBeFalse();
      });

      it('should return true from didYouInteractWithThis if userId in dislikeArray', () => {
        component['actualForumElement'] = { ...forumTemplate2 };

        expect(component.didYouInteractWithThis('dislikeArray')).toBeTrue();
      });

      it('should return false from didYouInteractWithThis if userId not in dislikeArray', () => {
        component['actualForumElement'] = { ...forumTemplate };

        expect(component.didYouInteractWithThis('dislikeArray')).toBeFalse();
      });

      it('should return false from didYouInteractWithThis if actualForumElement is undefined', () => {
        component['actualForumElement'] = undefined;
        expect(component.didYouInteractWithThis('dislikeArray')).toBeFalse();
        expect(component.didYouInteractWithThis('likeArray')).toBeFalse();
      });
    });

    describe('numberOfSpecificAction', () => {
      let forumTemplate2: forum;
      let rand:number;
      beforeEach(() => {
        forumTemplate2 = { ...forumTemplate };
        rand = Math.floor(Math.random()*10)+1
        for (let i = 0; i < rand; i++) {
          forumTemplate.likeArray.push('1')
          forumTemplate.dislikeArray.push('1')
          forumTemplate.commentsIdArray.push('1') 
        }
      });

      it('shold return the length of likeArray',()=>{
        console.log(rand)
        console.log(rand)
        console.log(rand)
      })

    });
  });
});
