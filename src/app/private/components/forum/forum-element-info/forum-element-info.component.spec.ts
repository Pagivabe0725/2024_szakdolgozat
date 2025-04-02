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

fdescribe('ForumElementInfoComponent', () => {
  let component: ForumElementInfoComponent;
  let fixture: ComponentFixture<ForumElementInfoComponent>;
  let collectionServiceMock: jasmine.SpyObj<CollectionService>;
  let popupServiceMock: jasmine.SpyObj<PopupService>;
  let navigationServiceMock: jasmine.SpyObj<NavigateAndurlinfoService>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  //let ActivatedRouteMock: jasmine.SpyObj<ActivatedRoute>;

  const dialogTemplate: Dialog = {
    width: '70%',
    height: '70%',
    hostComponent: 'ForumElementInfoComponent',
    title: '',
    content: '',
    action: false,
    hasInput: false,
  };

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
          useValue: { params: of({ id: 'forumId123' }) },
        },
      ],
    }).compileComponents();

    popupServiceMock.getTemplateDialog.and.returnValue({ ...dialogTemplate });

    fixture = TestBed.createComponent(ForumElementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
