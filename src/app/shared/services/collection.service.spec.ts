import { TestBed } from '@angular/core/testing';

import { CollectionService } from './collection.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

fdescribe('CollectionService', () => {
  let service: CollectionService;
  const firestoreMock = {
    collection: jasmine.createSpy().and.callFake((collectionName: string) => ({
      doc: jasmine.createSpy().and.callFake((docId: string) => ({
        valueChanges: jasmine
          .createSpy()
          .and.returnValue(of({ data: 'mockData' })),
        set: jasmine.createSpy().and.returnValue(Promise.resolve()),
        delete: jasmine.createSpy().and.returnValue(Promise.resolve()),
      })),
      get: jasmine
        .createSpy()
        .and.returnValue(of([{ id: 'doc1' }, { id: 'doc2' }])),
    })),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: firestoreMock }],
    });
    service = TestBed.inject(CollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should execute constructor before any other logic',()=>{
    expect(service['angularFirestore']).toBeDefined()
  })

  describe('Functions:',()=>{
    
  })
});
