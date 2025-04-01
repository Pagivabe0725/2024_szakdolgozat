import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumComponent } from './forum.component';
import { CollectionService } from '../../../shared/services/collection.service';
import { of, throwError } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

// Mock adatok definiálása
const mockCategoryResponse = { 0: ['category1', 'category2'] };
const mockForumResponse = {
  someKey: { docs: [{ id: 'forum1' }, { id: 'forum2' }] },
};
const mockForumDetails = { forumName: 'Test Forum' };

fdescribe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;
  let collectionServiceMock: jasmine.SpyObj<CollectionService>;

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

      fixture.detectChanges();
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
  });
});
