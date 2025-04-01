import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumComponent } from './forum.component';
import { CollectionService } from '../../../shared/services/collection.service';
import { of, throwError } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

// Mock adatok definiálása
const mockCategoryResponse = {
  0: [`category${randoNumber()}`, `category${randoNumber()}`],
};
const mockForumResponse = {
  someKey: { docs: [{ id: 'forum1' }, { id: 'forum2' }] },
};
const mockForumDetails = { forumName: 'Test Forum' };

function randoNumber(): number {
  return Math.floor(Math.random() * 1000);
}

fdescribe('ForumComponent', () => {
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
      console.log(component.forumObjectArray);
    });

    it('categoryArray should not be empty', () => {
      expect(component.categoryArray).not.toEqual([]);
      console.log(component.categoryArray);
    });

    it('keyArray should not be empty', () => {
      expect(component['keyArray']).not.toEqual([]);
      console.log(component['keyArray']);
    });

    it('HTML structure should be contains app-leftside-console', () => {
      expect(html.querySelector('app-leftside-console')).toBeTruthy();
    });

    it('HTML structure should not be contains app-spinner', () => {
      expect(html.querySelector('app-spinner')).toBeFalsy();
    });
  });

  describe('Observables', () => {
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
  });
});
