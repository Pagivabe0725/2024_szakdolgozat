import { TestBed } from '@angular/core/testing';
import { CollectionService } from './collection.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('CollectionService', () => {
  let service: CollectionService;

  let valueChangesSpy: jasmine.Spy;
  let setSpy: jasmine.Spy;
  let deleteSpy: jasmine.Spy;
  let getSpy: jasmine.Spy;
  let docSpy: jasmine.Spy;
  let collectionSpy: jasmine.Spy;

  beforeEach(() => {
    valueChangesSpy = jasmine
      .createSpy()
      .and.returnValue(of({ data: 'mockData' }));
    setSpy = jasmine.createSpy().and.returnValue(Promise.resolve('setDone'));
    deleteSpy = jasmine
      .createSpy()
      .and.returnValue(Promise.resolve('deleteDone'));
    getSpy = jasmine
      .createSpy()
      .and.returnValue(of([{ id: 'doc1' }, { id: 'doc2' }]));
    docSpy = jasmine.createSpy().and.returnValue({
      valueChanges: valueChangesSpy,
      set: setSpy,
      delete: deleteSpy,
    });
    collectionSpy = jasmine.createSpy().and.returnValue({
      doc: docSpy,
      get: getSpy,
    });

    const firestoreMock = {
      collection: collectionSpy,
    };

    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: firestoreMock }],
    });

    service = TestBed.inject(CollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return valueChanges observable from getCollectionByCollectionAndDoc', (done) => {
    service
      .getCollectionByCollectionAndDoc('testCollection', 'testDoc')
      .subscribe((data) => {
        expect(data).toEqual({ data: 'mockData' });
        expect(collectionSpy).toHaveBeenCalledWith('testCollection');
        expect(docSpy).toHaveBeenCalledWith('testDoc');
        expect(valueChangesSpy).toHaveBeenCalled();
        done();
      });
  });

  it('should return documents from getAllDocByCollectionName', (done) => {
    service.getAllDocByCollectionName('testCollection').subscribe((docs) => {
      expect(docs).toEqual([{ id: 'doc1' }, { id: 'doc2' }]);
      expect(collectionSpy).toHaveBeenCalledWith('testCollection');
      expect(getSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should call set method in createCollectionDoc', async () => {
    const data = { title: 'testData' };
    await service.createCollectionDoc('testCollection', 'testId', data);
    expect(collectionSpy).toHaveBeenCalledWith('testCollection');
    expect(docSpy).toHaveBeenCalledWith('testId');
    expect(setSpy).toHaveBeenCalledWith(data);
  });

  it('should call set method in updateDatas', async () => {
    const update = { updated: true };
    await service.updateDatas('testCollection', 'testDoc', update);
    expect(collectionSpy).toHaveBeenCalledWith('testCollection');
    expect(docSpy).toHaveBeenCalledWith('testDoc');
    expect(setSpy).toHaveBeenCalledWith(update);
  });

  it('should call delete method in deleteDatas', async () => {
    await service.deleteDatas('testCollection', 'testDoc');
    expect(collectionSpy).toHaveBeenCalledWith('testCollection');
    expect(docSpy).toHaveBeenCalledWith('testDoc');
    expect(deleteSpy).toHaveBeenCalled();
  });
});
