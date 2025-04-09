import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { user } from '../interfaces/user';

fdescribe('UserService', () => {
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
});
