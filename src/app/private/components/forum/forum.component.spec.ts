import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumComponent } from './forum.component';
import { CollectionService } from '../../../shared/services/collection.service';
import { firstValueFrom, of } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { forum } from '../../../shared/interfaces/forum';
import { forumTemplate } from '../../../shared/template/testTemplates';
// Mock adatok definiálása
const mockCategoryResponse = {
  0: [`category${randoNumber()}`, `category${randoNumber()}`],
};
const mockForumResponse = {
  someKey: { docs: [{ id: 'forum1' }, { id: 'forum2' }] },
};
/*
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
  category: mockCategoryResponse[0][0],
};
*/
const forumTemplate2: forum = {
  title: 'first',
  id: '2',
  userId: '2',
  text: 'It is a test text too',
  author: 'Tester2',
  date: Timestamp.now(),
  commentsIdArray: [],
  dislikeArray: [],
  likeArray: [],
  category: mockCategoryResponse[0][1],
};

function randoNumber(): number {
  return Math.floor(Math.random() * 1000);
}

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;
  let collectionServiceMock: jasmine.SpyObj<CollectionService>;
  let html: HTMLElement;
  describe('Before ngOnInit', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule, ForumComponent],
        providers: [
          { provide: CollectionService, useValue: collectionServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ForumComponent);
      component = fixture.componentInstance;
      html = fixture.nativeElement;
    });

    it('loaded should be false', () => {
      expect(component.loaded).toBeFalse();
    });

    it('forumObjectArray should be empty', () => {
      expect(component.forumObjectArray).toEqual([]);
    });

    it('categoryArray should be empty', () => {
      expect(component.categoryArray).toEqual([]);
    });

    it('categoryArray should be empty', () => {
      expect(component['keyArray']).toEqual([]);
    });

    it('collectionSub should be undefined', () => {
      expect(component['collectionSub']).not.toBeDefined();
    });

    it('forumKeysSub should be undefined', () => {
      expect(component['forumKeysSub']).not.toBeDefined();
    });
  });

  describe('Basics', () => {
    beforeEach(async () => {
      collectionServiceMock = jasmine.createSpyObj('CollectionService', [
        'getCollectionByCollectionAndDoc',
        'getAllDocByCollectionName',
      ]);

      collectionServiceMock.getCollectionByCollectionAndDoc.and.returnValue(
        of(mockCategoryResponse)
      );
      collectionServiceMock.getAllDocByCollectionName.and.returnValue(
        of(mockForumResponse)
      );

      await TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule, ForumComponent],
        providers: [
          { provide: CollectionService, useValue: collectionServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ForumComponent);
      component = fixture.componentInstance;

      await fixture.detectChanges();
      html = fixture.nativeElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('loaded should be true', () => {
      expect(component.loaded).toBeTrue();
    });

    it('forumObjectArray should not be empty', () => {
      expect(component.forumObjectArray).not.toEqual([]);
    });

    it('categoryArray should not be empty', () => {
      expect(component.categoryArray).not.toEqual([]);
    });

    it('keyArray should not be empty', () => {
      expect(component['keyArray']).not.toEqual([]);
    });

    it('HTML structure should be contains app-leftside-console', () => {
      expect(html.querySelector('app-leftside-console')).toBeTruthy();
    });

    it('HTML structure should not be contains app-spinner', () => {
      expect(html.querySelector('app-spinner')).toBeFalsy();
    });
    it('collectionSub should be definied', () => {
      expect(component['collectionSub']).toBeDefined();
    });
    it('forumKeysSub should be definied', () => {
      expect(component['forumKeysSub']).toBeDefined();
    });
  });

  describe('Observables', () => {
    beforeEach(async () => {
      collectionServiceMock = jasmine.createSpyObj('CollectionService', [
        'getCollectionByCollectionAndDoc',
        'getAllDocByCollectionName',
      ]);
      collectionServiceMock.getCollectionByCollectionAndDoc.and.callFake(
        (collectionName, docName) => {
          if (collectionName === 'Categories') {
            return of(mockCategoryResponse);
          } else {
            if (collectionName === 'Forums' && docName === 'forum1') {
              return of(forumTemplate);
            } else if (collectionName === 'Forums' && docName === 'forum2') {
              return of(forumTemplate2);
            }
          }
          return of(null);
        }
      );
      collectionServiceMock.getAllDocByCollectionName.and.returnValue(
        of(mockForumResponse)
      );

      await TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule, ForumComponent],
        providers: [
          { provide: CollectionService, useValue: collectionServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ForumComponent);
      component = fixture.componentInstance;
      html = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('collectionSub working', async () => {
      expect(component.categoryArray).toEqual([
        'Összes',
        'Saját',
        mockCategoryResponse[0][0],
        mockCategoryResponse[0][1],
      ]);
    });

    it('forumKeysSub working', async () => {
      expect(component['keyArray']).toEqual(['forum1', 'forum2']);
    });

    it('Forum details are correct', async () => {
      let result = await firstValueFrom(
        collectionServiceMock.getCollectionByCollectionAndDoc(
          'Categories',
          'all'
        )
      );
      expect(result).toEqual(mockCategoryResponse);

      result = await firstValueFrom(
        collectionServiceMock.getCollectionByCollectionAndDoc(
          'Forums',
          'forum1'
        )
      );
      expect(result).toEqual(forumTemplate);

      result = await firstValueFrom(
        collectionServiceMock.getCollectionByCollectionAndDoc(
          'Forums',
          'forum2'
        )
      );
      expect(result).toEqual(forumTemplate2);
    });
  });

  describe('HTML', () => {
    let HTML: HTMLElement;

    beforeEach(async () => {
      HTML = await fixture.nativeElement;
    });

    it('HTML should be loaded', () => {
      expect(HTML).toBeTruthy();
    });

    it('HTML should containe left-side component', () => {
      const app_component = HTML.querySelector('app-leftside-console') ?? null;
      expect(app_component).toBeTruthy();
    });

    it('app-card-elements should not be loaded', () => {
      const app_cards = HTML.querySelectorAll('app-card-element');
      expect(app_cards.length).toEqual(component['forumObjectArray'].length);
    });

  });
});
