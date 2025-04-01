import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardElementComponent } from './card-element.component';
import { forum } from '../../../../shared/interfaces/forum';
import { Timestamp } from '@angular/fire/firestore';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardElementComponent],
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
});
