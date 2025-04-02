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

    await TestBed.configureTestingModule({
      imports: [ForumElementInfoComponent, CommonModule],
      providers: [
        { provide: CollectionService, useValue: collectionServiceMock },
        { provide: PopupService, useValue: popupServiceMock },
        { provide: NavigateAndurlinfoService, useValue: navigationServiceMock },
        { provide: UserService, useValue: userServiceMock },
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
      console.log(component['actualForumElement'])
      expect(component['actualForumElement']).toBeDefined();
    });
  });
});
