import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardElementComponent } from './card-element.component';
import { forum } from '../../../../shared/interfaces/forum';
import { Timestamp } from '@angular/fire/firestore';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';

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
  category: 'Category',
};

fdescribe('CardElementComponent', () => {
  let component: CardElementComponent;
  let fixture: ComponentFixture<CardElementComponent>;
  let navigateAndurlinfoServiceMock: jasmine.SpyObj<NavigateAndurlinfoService>;

  beforeEach(async () => {
    navigateAndurlinfoServiceMock = jasmine.createSpyObj(
      'NavigateAndurlinfoService',
      ['navigate']
    );

    await TestBed.configureTestingModule({
      imports: [CardElementComponent],
      providers: [
        {
          provide: NavigateAndurlinfoService,
          useValue: navigateAndurlinfoServiceMock,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CardElementComponent);
    component = fixture.componentInstance;
    component.actualForumMessage = { ...forumTemplate };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('actualForumMessage should be correct', () => {
    const html: HTMLElement = fixture.nativeElement;
    const cardTitle = html.querySelector('mat-card-header');
    const cardText = html.querySelector('mat-card-content');
    const cardAuthor = html.querySelector('mat-card-footer');
    expect(cardText?.textContent).toEqual('It is a test text');
    expect(cardTitle?.textContent).toEqual('first');
    expect(cardAuthor?.textContent?.split(':')[1].trim()).toEqual('Tester');
  });

  it('loadForumElement function works', () => {
    const html: HTMLElement = fixture.nativeElement;
    const matCard = html.querySelector('mat-card');
    matCard!.dispatchEvent(new Event('click'));
    expect(navigateAndurlinfoServiceMock.navigate).toHaveBeenCalledWith(
      false,
      forumTemplate.id
    );
  });

  it('should return false if no dark theme ', () => {
    spyOn(localStorage, 'getItem').and.returnValue('');
    expect(component.isDarkmode()).toBeFalse();
  });

  it('should return true if  dark theme ', () => {
    spyOn(localStorage, 'getItem').and.returnValue('darkblue');
    expect(component.isDarkmode()).toBeTrue();
  });
});
