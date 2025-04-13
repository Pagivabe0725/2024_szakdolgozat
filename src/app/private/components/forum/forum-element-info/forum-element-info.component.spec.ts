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
import { MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from '../../../../shared/components/popup/popup.component';
import { forumComment } from '../../../../shared/interfaces/forumComment';

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
  gender:'Férfi'
};

const commentTemplate: forumComment = {
  content: 'something',
  id: '1',
  userid: '1',
  author: 'Tester',
  date: Timestamp.now(),
};

describe('ForumElementInfoComponent', () => {
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

    arrayServiceMock = jasmine.createSpyObj('arrayService', [
      'elementInArray',
      'deleteElementFromArray',
      'addElementToArray',
      'getIndex',
    ]);

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
      // console.log(component['forumSub']);
      expect(component['forumSub']).toBeDefined();
    });

    it('userSub should be defined', async () => {
      await component.ngOnInit();
      expect(component['userSub']).toBeDefined();
    });

    it('actualForumElement should be defined', async () => {
      await component.ngOnInit();
      //console.log(component['actualForumElement']);
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
      let rand: number;
      beforeEach(() => {
        rand = Math.floor(Math.random() * 9) + 1;
        forumTemplate2 = {
          ...forumTemplate,
          likeArray: Array(rand).fill('1'),
          dislikeArray: Array(rand).fill('1'),
          commentsIdArray: Array(rand).fill('1'),
        };
      });

      it('shold return the length of likeArray', () => {
        //forumTemplate2.likeArray = ['1', '1'];
        component['actualForumElement'] = { ...forumTemplate2 };
        expect(component.numberOfSpecificAction('likeArray')).toEqual(rand);
      });
      it('shold return the length of dislikeArray', () => {
        //forumTemplate2.dislikeArray = ['1', '1'];
        component['actualForumElement'] = { ...forumTemplate2 };
        expect(component.numberOfSpecificAction('dislikeArray')).toEqual(rand);
      });
      it('shold return the length of commentsIdArray', () => {
        //forumTemplate2.commentsIdArray = ['1', '1'];
        component['actualForumElement'] = { ...forumTemplate2 };
        expect(component.numberOfSpecificAction('commentsIdArray')).toEqual(
          rand
        );
      });

      it('shold 0 if likeArray is empty', () => {
        forumTemplate2.likeArray = [];
        component['actualForumElement'] = { ...forumTemplate2 };
        expect(component.numberOfSpecificAction('likeArray')).toEqual(0);
      });

      it('shold 0 if dislikeArray is empty', () => {
        forumTemplate2.dislikeArray = [];
        component['actualForumElement'] = { ...forumTemplate2 };
        expect(component.numberOfSpecificAction('dislikeArray')).toEqual(0);
      });

      it('shold 0 if commentsIdArray is empty', () => {
        forumTemplate2.commentsIdArray = [];
        component['actualForumElement'] = { ...forumTemplate2 };
        expect(component.numberOfSpecificAction('commentsIdArray')).toEqual(0);
      });

      it('should return 0 if actualForumElement is undefined', () => {
        component['actualForumElement'] = undefined;
        expect(component.numberOfSpecificAction('likeArray')).toBe(0);
      });
    });

    describe('isMyForumElement', () => {
      let forumTemplate2: forum;

      beforeAll(() => {
        spyOn(localStorage, 'getItem').and.returnValue('1');
      });
      beforeEach(() => {
        forumTemplate2 = { ...forumTemplate };
      });

      it('should return true when both forum IDs are the same', () => {
        component['actualForumElement'] = { ...forumTemplate2 };
        //console.log(component['actualForumElement']);
        expect(component.isMyForumElement()).toBeTrue();
      });

      it('should return false when both forum IDs are different', () => {
        forumTemplate2.userId = '2';
        component['actualForumElement'] = { ...forumTemplate2 };
        //console.log(component['actualForumElement']);
        expect(component.isMyForumElement()).toBeFalse();
      });

      it('should return false when actualForumElement is undefined', () => {
        //console.log(component['actualForumElement']);
        expect(component.isMyForumElement()).toBeFalse();
      });
    });

    describe('arrayAction', () => {
      let forumTemplate2: forum;
      beforeEach(() => {
        forumTemplate2 = { ...forumTemplate };
        spyOn(localStorage, 'getItem').and.returnValue('userId');
        arrayServiceMock.elementInArray.and.returnValue(true);
        arrayServiceMock.getIndex.and.returnValue(0);
        arrayServiceMock.deleteElementFromArray.and.stub();
        arrayServiceMock.addElementToArray.and.stub();
        /*
        arrayServiceMock.deleteElementFromArray.and.callFake(
          (element, array) => {
            array.splice(array.indexOf(element), 1);
            return array;
          }
        );

        arrayServiceMock.addElementToArray.and.callFake((element, array) => {
          array.push(element);
          return array;
        });
        */
      });

      it('should delete id from likeArray if already interacted', () => {
        forumTemplate2.likeArray = ['userId'];
        component['actualForumElement'] = { ...forumTemplate2 };
        component.arrayAction('likeArray');
        expect(arrayServiceMock.deleteElementFromArray).toHaveBeenCalledWith(
          'userId',
          forumTemplate2.likeArray
        );
      });

      it('should delete id from dislikeArray if already interacted', () => {
        forumTemplate2.dislikeArray = ['userId'];
        component['actualForumElement'] = { ...forumTemplate2 };
        component.arrayAction('dislikeArray');
        expect(arrayServiceMock.deleteElementFromArray).toHaveBeenCalledWith(
          'userId',
          forumTemplate2.dislikeArray
        );
      });

      it('should add id to dislikeArray if not interacted yet', () => {
        arrayServiceMock.elementInArray.and.returnValue(false);
        component['actualForumElement'] = { ...forumTemplate2 };
        component.arrayAction('dislikeArray');
        expect(arrayServiceMock.addElementToArray).toHaveBeenCalledWith(
          'userId',
          forumTemplate2.dislikeArray
        );
      });

      it('should add id to likeArray if not interacted yet', () => {
        arrayServiceMock.elementInArray.and.returnValue(false);
        component['actualForumElement'] = { ...forumTemplate2 };
        component.arrayAction('likeArray');
        expect(arrayServiceMock.addElementToArray).toHaveBeenCalledWith(
          'userId',
          forumTemplate2.likeArray
        );

        console.log(component['actualForumElement']);
      });
    });

    describe('Interact', () => {
      let forumTemplate2: forum;

      beforeEach(() => {
        forumTemplate2 = { ...forumTemplate };
        spyOn(component, 'isMyForumElement').and.returnValue(false);
        spyOn(component, 'arrayAction');
      });

      it('should add userId to likeArray when not yet interacted', () => {
        component['actualForumElement'] = { ...forumTemplate2 };
        spyOn(component, 'didYouInteractWithThis').and.returnValue(false);
        collectionServiceMock.updateDatas.and.returnValue(Promise.resolve());

        component.Interact('likeArray');

        expect(component.arrayAction).toHaveBeenCalledWith('likeArray');
      });

      it('should remove userId from dislikeArray when switching to likeArray', () => {
        component['actualForumElement'] = { ...forumTemplate2 };
        spyOn(component, 'didYouInteractWithThis').and.returnValue(true);

        collectionServiceMock.updateDatas.and.returnValue(Promise.resolve());
        component.Interact('likeArray');
        expect(component.arrayAction).toHaveBeenCalledWith('likeArray');
        expect(component.arrayAction).toHaveBeenCalledWith('dislikeArray');
      });

      it('should do nothing if user interacts with their own post', () => {
        component['actualForumElement'] = { ...forumTemplate2 };
        ///így kellene fellülírni egy korábban elspy-olt cuccost
        (component.isMyForumElement as jasmine.Spy).and.returnValue(true);
        component.Interact('likeArray');
        expect(component.arrayAction).not.toHaveBeenCalled();
      });

      it('should remove like if user dislikes and already liked', () => {
        component['actualForumElement'] = { ...forumTemplate2 };

        (component.isMyForumElement as jasmine.Spy).and.returnValue(false);
        spyOn(component, 'didYouInteractWithThis')
          .withArgs('likeArray')
          .and.returnValue(true);
        collectionServiceMock.updateDatas.and.returnValue(Promise.resolve());

        component.Interact('dislikeArray');

        expect(component.arrayAction).toHaveBeenCalledWith('dislikeArray');
        expect(component.arrayAction).toHaveBeenCalledWith('likeArray');
      });


      it('shouldexecute catch par', () => {
        component['actualForumElement'] = { ...forumTemplate2 };

        (component.isMyForumElement as jasmine.Spy).and.returnValue(false);
        spyOn(component, 'didYouInteractWithThis')
          .withArgs('likeArray')
          .and.returnValue(true);
        collectionServiceMock.updateDatas.and.returnValue(Promise.reject());

        component.Interact('dislikeArray');

        expect(component.arrayAction).toHaveBeenCalledWith('dislikeArray');
        expect(component.arrayAction).toHaveBeenCalledWith('likeArray');
      });
    });

    describe('deleteForumElement', () => {
      let dialogRef;
      let forumTemplate2: forum;

      beforeEach(() => {
        forumTemplate2 = { ...forumTemplate };
      });

      it('popup should contain the correct content', async () => {
        dialogRef = { afterClosed: () => of(true) } as Partial<
          MatDialogRef<PopupComponent>
        > as MatDialogRef<PopupComponent>;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.deleteDatas.and.returnValue(Promise.resolve());
        collectionServiceMock.updateDatas.and.returnValue(Promise.resolve());
        forumTemplate2.commentsIdArray.push(commentTemplate.id);
        component['actualForumElement'] = forumTemplate2;

        await component.deleteForumElement();
        console.log(component['popupDialogTemplate']);
        expect(popupServiceMock.displayPopUp).toHaveBeenCalledWith({
          title: 'Biztosan',
          content: 'Biztosan törölni szeretné ezt a bejegyzést?',
          hasInput: false,
          action: true,
          width: '70%',
          height: '70%',
          hostComponent: 'ForumElementInfoComponent',
        } as Dialog);
      });

      it('should invite deleteDatas function with correct arguments', async () => {
        dialogRef = { afterClosed: () => of(true) } as Partial<
          MatDialogRef<PopupComponent>
        > as MatDialogRef<PopupComponent>;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.deleteDatas.and.returnValue(Promise.resolve());
        forumTemplate2.commentsIdArray.push(commentTemplate.id);
        component['actualForumElement'] = forumTemplate2;

        await component.deleteForumElement();
        expect(collectionServiceMock.deleteDatas).toHaveBeenCalled();
      });

      it('should not invite deleteDatas function with correct arguments', async () => {
        dialogRef = { afterClosed: () => of(false) } as Partial<
          MatDialogRef<PopupComponent>
        > as MatDialogRef<PopupComponent>;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.deleteDatas.and.returnValue(Promise.resolve());
        forumTemplate2.commentsIdArray.push(commentTemplate.id);
        component['actualForumElement'] = forumTemplate2;
        await component.deleteForumElement();
        expect(collectionServiceMock.deleteDatas).not.toHaveBeenCalled();
      });

      it('should not invite deleteDatas function with correct arguments', async () => {
        dialogRef = { afterClosed: () => of(false) } as Partial<
          MatDialogRef<PopupComponent>
        > as MatDialogRef<PopupComponent>;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.deleteDatas.and.returnValue(Promise.resolve());
        forumTemplate2.commentsIdArray.push(commentTemplate.id);
        component['actualForumElement'] = forumTemplate2;
        await component.deleteForumElement();
        expect(collectionServiceMock.deleteDatas).not.toHaveBeenCalled();
      });

      it('should invite deleteDatas function catch part', async () => {
        dialogRef = { afterClosed: () => of(true) } as Partial<
          MatDialogRef<PopupComponent>
        > as MatDialogRef<PopupComponent>;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.deleteDatas.and.returnValue(Promise.reject());
        forumTemplate2.commentsIdArray.push(commentTemplate.id);
        component['actualForumElement'] = forumTemplate2;
        await component.deleteForumElement();
        expect(collectionServiceMock.deleteDatas).toHaveBeenCalled();
      });
    });

    describe('commentAction', () => {
      let forumTemplate2: forum;
      let comment: forumComment;
      let dialogRef: MatDialogRef<PopupComponent>;

      beforeEach(() => {
        forumTemplate2 = { ...forumTemplate, commentsIdArray: [] };
        comment = { ...commentTemplate };

        component['actualForumElement'] = forumTemplate2;
        component['actualUser'] = { ...userTemplate };

        spyOn(component, 'createComment').and.returnValue(comment);

        dialogRef = { afterClosed: () => of('Ez egy komment szöveg') } as any;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.createCollectionDoc.and.returnValue(
          Promise.resolve()
        );
        collectionServiceMock.updateDatas.and.returnValue(Promise.resolve());
      });

      it('should open popup and add comment when user submits', async () => {
        await component.commentAction();

        expect(popupServiceMock.displayPopUp).toHaveBeenCalled();
        expect(component.createComment).toHaveBeenCalledWith(
          'Ez egy komment szöveg'
        );
        expect(collectionServiceMock.createCollectionDoc).toHaveBeenCalledWith(
          'ForumComments',
          comment.id,
          comment
        );
        expect(collectionServiceMock.updateDatas).toHaveBeenCalledWith(
          'Forums',
          forumTemplate2.id,
          forumTemplate2
        );
        expect(forumTemplate2.commentsIdArray).toContain(comment.id);
        expect(component['commentsOfActualForumElementArray']).toContain(
          comment
        );
      });

      it('should not add comment if popup is cancelled', async () => {
        dialogRef = { afterClosed: () => of(null) } as any;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        await component.commentAction();
        expect(
          collectionServiceMock.createCollectionDoc
        ).not.toHaveBeenCalled();
        expect(collectionServiceMock.updateDatas).not.toHaveBeenCalled();
      });

      it('should invite updateDatas function catch part', async () => {
        dialogRef = { afterClosed: () => of('something') } as any;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.updateDatas.and.returnValue(
          Promise.reject('error')
        );
        await component.commentAction();
        expect(collectionServiceMock.createCollectionDoc).toHaveBeenCalled();
        expect(collectionServiceMock.updateDatas).toHaveBeenCalled();
      });

      it('should invite createCollectionDoc function catch part', async () => {
        dialogRef = { afterClosed: () => of('something') } as any;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.createCollectionDoc.and.returnValue(
          Promise.reject('error')
        );
        await component.commentAction();
        expect(collectionServiceMock.createCollectionDoc).toHaveBeenCalled();
        expect(collectionServiceMock.updateDatas).not.toHaveBeenCalled();
      });
    });

    describe('createComment', () => {
      beforeEach(() => {
        component['actualUser'] = {
          firstName: 'Elek',
          lastName: 'Teszt',
        } as user;

        spyOn(localStorage, 'getItem').and.returnValue('testUserId');
      });

      it('should return a forumComment object with correct values', () => {
        const content = 'Ez egy teszt komment.';
        const comment = component.createComment(content);

        expect(comment).toBeDefined();
        expect(comment.id).toBeTruthy();
        expect(comment.date).toBeInstanceOf(Timestamp); ////nézd még át
        expect(comment.author).toBe('Teszt Elek');
        expect(comment.userid).toBe('testUserId');
        expect(comment.content).toBe(content);
      });
    });
    describe('loadComments', () => {
      const commentIds = ['c1', 'c2', 'c3'];
      const mockComments: forumComment[] = [
        {
          id: 'c1',
          content: 'Comment 1',
          author: 'Test',
          date: Timestamp.now(),
          userid: 'u1',
        },
        {
          id: 'c2',
          content: 'Comment 2',
          author: 'Test',
          date: Timestamp.now(),
          userid: 'u1',
        },
        {
          id: 'c3',
          content: 'Comment 3',
          author: 'Test',
          date: Timestamp.now(),
          userid: 'u1',
        },
      ];

      beforeEach(() => {
        component['actualForumElement'] = {
          ...forumTemplate,
          commentsIdArray: [...commentIds],
        };

        collectionServiceMock.getCollectionByCollectionAndDoc.and.callFake(
          (colName: string, id: string) => {
            const comment = mockComments.find((c) => c.id === id);
            return of(comment);
          }
        );
      });

      it('should load comments and set loaded to true', async () => {
        component.loadComments();

        expect(
          collectionServiceMock.getCollectionByCollectionAndDoc
        ).toHaveBeenCalledTimes(commentIds.length);
        commentIds.forEach((id) => {
          expect(
            collectionServiceMock.getCollectionByCollectionAndDoc
          ).toHaveBeenCalledWith('ForumComments', id);
        });

        await fixture.whenStable();

        expect(component['commentsOfActualForumElementArray']).toEqual(
          mockComments
        );
        expect(component.loaded).toBeTrue();
      });
    });

    describe('deleteComment', () => {
      let dialogRef;
      let forumTemplate2: forum;

      beforeEach(() => {
        spyOn(component, 'loadComments');

        forumTemplate2 = {
          ...forumTemplate,
          commentsIdArray: [commentTemplate.id],
        };

        component['actualForumElement'] = { ...forumTemplate2 };

        dialogRef = {
          afterClosed: () => of(true),
        } as unknown as MatDialogRef<PopupComponent>;

        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.deleteDatas.and.returnValue(Promise.resolve());
        collectionServiceMock.updateDatas.and.returnValue(Promise.resolve());
      });

      it('should delete comment, update forum, and reload comments when confirmed', async () => {
        await component.deleteComment(0);
        await fixture.whenStable();

        expect(popupServiceMock.displayPopUp).toHaveBeenCalledWith({
          title: 'Biztosan?',
          content: 'Biztosan törölni szeretnéd a kommentet?',
          hasInput: false,
          action: true,
          width: '70%',
          height: '70%',
          hostComponent: 'ForumElementInfoComponent',
        });

        expect(collectionServiceMock.deleteDatas).toHaveBeenCalledWith(
          'ForumComments',
          commentTemplate.id
        );
        expect(collectionServiceMock.updateDatas).toHaveBeenCalledWith(
          'Forums',
          forumTemplate.id,
          jasmine.objectContaining({
            commentsIdArray: [],
          })
        );

        expect(component.loadComments).toHaveBeenCalled();
      });

      it('should do nothing if user cancels the popup', async () => {
        dialogRef = {
          afterClosed: () => of(false),
        } as unknown as MatDialogRef<PopupComponent>;
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);

        await component.deleteComment(0);

        expect(collectionServiceMock.deleteDatas).not.toHaveBeenCalled();
        expect(collectionServiceMock.updateDatas).not.toHaveBeenCalled();
        expect(component.loadComments).not.toHaveBeenCalled();
      });

      it('should execute updateDatas function catch part', async () => {
        const forumTemplate2 = {
          ...forumTemplate,
          commentsIdArray: [commentTemplate.id],
        };
  
        component['actualForumElement'] = forumTemplate2;
  
        const dialogRef = {
          afterClosed: () => of(true),
        } as unknown as MatDialogRef<PopupComponent>;
  
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.deleteDatas.and.returnValue(Promise.resolve());
        collectionServiceMock.updateDatas.and.returnValue(
          Promise.reject('update failed')
        );
  
        await component.deleteComment(0);
        await fixture.whenStable();
  
        expect(collectionServiceMock.updateDatas).toHaveBeenCalled();
      });
  
      it('should execute deleteDatas function catch part', async () => {
        const forumTemplate2 = {
          ...forumTemplate,
          commentsIdArray: [commentTemplate.id],
        };
  
        component['actualForumElement'] = forumTemplate2;
  
        const dialogRef = {
          afterClosed: () => of(true),
        } as unknown as MatDialogRef<PopupComponent>;
  
        popupServiceMock.displayPopUp.and.returnValue(dialogRef);
        collectionServiceMock.deleteDatas.and.returnValue(
          Promise.reject('delete failed')
        );
        collectionServiceMock.updateDatas.and.returnValue(Promise.resolve());
  
        await component.deleteComment(0);
        await fixture.whenStable();
  
        expect(collectionServiceMock.deleteDatas).toHaveBeenCalledWith(
          'ForumComments',
          commentTemplate.id
        );
      });
    });

    describe('isMyComment', () => {
      it('should return true if userId matches the comment author', () => {
        spyOn(localStorage, 'getItem').and.returnValue('123');
        expect(component.isMyComment('123')).toBeTrue();
      });
    
      it('should return false if userId does not match the comment author', () => {
        spyOn(localStorage, 'getItem').and.returnValue('123');
        expect(component.isMyComment('456')).toBeFalse();
      });
    
      it('should return false if localStorage returns null', () => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
        expect(component.isMyComment('456')).toBeFalse();
      });
    });
    
  });
});
