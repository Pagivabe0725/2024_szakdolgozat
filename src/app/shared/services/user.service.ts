import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {}

  createNewUser(user: user): Promise<void> {
    return this.angularFirestore
      .collection<user>('Users')
      .doc(user.id)
      .set(user);
  }

  updateUser(user: user): Promise<void> {
    return this.angularFirestore
      .collection<user>('Users')
      .doc(user.id)
      .set(user);
  }

  userRegistration(email: string, password: string): Promise<any> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }

  getUserInfoByUserId(id: string): Observable<unknown> {
    return this.angularFirestore
      .collection<user>('Users')
      .doc(id)
      .valueChanges();
  }
}
