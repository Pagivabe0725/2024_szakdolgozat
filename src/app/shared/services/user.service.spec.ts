import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { user } from '../interfaces/user';
import { Timestamp } from '@angular/fire/firestore';

const userTemplate: user = {
  id: 'UserId',
  firstName: 'firstName',
  lastName: 'lastName',
  lastLogin: Timestamp.now(),
  email: 'test@gmail.com',
  gender:'Férfi',
  city: undefined,
  telNumber: '06905777170',
  dateOfRegistration: Timestamp.now(),
};

describe('UserService', () => {
  let service: UserService;
  let firestoreMock: any;
  let authMock: any;

  beforeEach(() => {
    firestoreMock = {
      collection: jasmine.createSpy().and.callFake(() => ({
        doc: jasmine.createSpy().and.callFake(() => ({
          set: jasmine.createSpy().and.returnValue(Promise.resolve()),
          valueChanges: jasmine
            .createSpy()
            .and.returnValue(of({ name: 'mockedUser' })),
        })),
        valueChanges: jasmine
          .createSpy()
          .and.returnValue(of([{ name: 'user1' }, { name: 'user2' }])),
      })),
    };

    authMock = {
      createUserWithEmailAndPassword: jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ user: { uid: '123' } })),
      signInWithEmailAndPassword: jasmine
        .createSpy()
        .and.returnValue(Promise.resolve({ user: { uid: '123' } })),
      signOut: jasmine.createSpy().and.returnValue(Promise.resolve()),
    };

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: AngularFireAuth, useValue: authMock },
      ],
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('services should be exist', () => {
    expect(service['angularFireAuth']).toBeDefined();
    expect(service['angularFirestore']).toBeDefined();
  });

  describe('Functions', () => {
    it('createNewUser should work', async () => {
      await service.createNewUser({ ...userTemplate });

      const collectionSpy = firestoreMock.collection;
      const docSpy = collectionSpy.calls.mostRecent().returnValue.doc;
      const setSpy = docSpy.calls.mostRecent().returnValue.set;

      expect(collectionSpy).toHaveBeenCalledWith('Users');
      expect(docSpy).toHaveBeenCalledWith(userTemplate.id);
      expect(setSpy).toHaveBeenCalledWith(userTemplate);
    });

    it('updateUser should work', async () => {
      await service.updateUser({ ...userTemplate });

      const collectionSpy = firestoreMock.collection;
      const docSpy = collectionSpy.calls.mostRecent().returnValue.doc;
      const setSpy = docSpy.calls.mostRecent().returnValue.set;

      expect(collectionSpy).toHaveBeenCalledWith('Users');
      expect(docSpy).toHaveBeenCalledWith(userTemplate.id);
      expect(setSpy).toHaveBeenCalledWith(userTemplate);
    });

    it('userRegistration should work', async () => {
      await service.userRegistration(userTemplate.email, '123456');

      const auth = authMock.createUserWithEmailAndPassword;
      const result = auth.calls.mostRecent().returnValue.__zone_symbol__value;
      expect(result).toEqual({ user: { uid: '123' } });
    });

    it('login should work', async () => {
      const result = await service.login(userTemplate.email, '123456');
      expect(authMock.signInWithEmailAndPassword).toHaveBeenCalledWith(
        userTemplate.email,
        '123456'
      );
      expect(result).toEqual({ user: { uid: '123' } });
    });

    it('logout should work', async () => {
      await service.logout();
      expect(authMock.signOut).toHaveBeenCalled();
    });

    it('getUserInfoByUserId should work', (done) => {
      service.getUserInfoByUserId('1234').subscribe((result) => {
        expect(result).toEqual({ name: 'mockedUser' });
        expect(firestoreMock.collection).toHaveBeenCalledWith('Users');
        const docSpy =
          firestoreMock.collection.calls.mostRecent().returnValue.doc;
        expect(docSpy).toHaveBeenCalledWith('1234');
        const valueChangesSpy =
          docSpy.calls.mostRecent().returnValue.valueChanges;
        expect(valueChangesSpy).toHaveBeenCalled();
        done();
      });
    });

    it('getUsers should work', (done) => {
      service.getUsers().subscribe((result) => {
        expect(result).toEqual([{ name: 'user1' }, { name: 'user2' }]);
        expect(firestoreMock.collection).toHaveBeenCalledWith('Users');
        const valueChangesSpy =
          firestoreMock.collection.calls.mostRecent().returnValue.valueChanges;
        expect(valueChangesSpy).toHaveBeenCalled();
        done();
      });
    });
  });
});
