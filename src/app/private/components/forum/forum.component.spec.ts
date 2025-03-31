import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumComponent } from './forum.component';
import { CollectionService } from '../../../shared/services/collection.service';
import { of, throwError } from 'rxjs';

fdescribe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;
  let collectionServiceMock: jasmine.SpyObj<CollectionService>;

  beforeEach(async () => {
    collectionServiceMock = jasmine.createSpyObj('CollectionService', [
      'getCollectionByCollectionAndDoc',
      'getAllDocByCollectionName',
    ]);

    await TestBed.configureTestingModule({
      
      imports: [BrowserAnimationsModule,ForumComponent],
      providers: [
        { provide: CollectionService, useValue: collectionServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    // Mock adatok definiálása
    const mockCategoryResponse = { 0: ['category1', 'category2'] };
    const mockForumResponse = {
      someKey: { docs: [{ id: 'forum1' }, { id: 'forum2' }] },
    };
    const mockForumDetails = { forumName: 'Test Forum' };

    collectionServiceMock.getCollectionByCollectionAndDoc.and.returnValues(
      of(mockCategoryResponse),
    );
    collectionServiceMock.getAllDocByCollectionName.and.returnValue(
      of(mockForumResponse)
    );
    fixture.detectChanges()
  });

  it('should create', async () => {   
    expect(component).toBeTruthy();
  });

  it('should contain app-spinner',()=>{
    const html:HTMLElement = fixture.nativeElement
    console.log(html.querySelector('app-spinner'))
    expect(html.getElementsByTagName('app-spinner')).toBeTruthy()
  })

  it('should contain app-leftside-console',()=>{
    const html:HTMLElement = fixture.nativeElement
    expect(html.getElementsByTagName('app-leftside-console')).toBeTruthy()
  })

  it('should contain app-leftside-console',()=>{
    const html:HTMLElement = fixture.nativeElement
    expect(html.getElementsByTagName('app-leftside-console')).toBeTruthy()
  })

});
