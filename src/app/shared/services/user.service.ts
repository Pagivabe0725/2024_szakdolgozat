import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { user } from '../interfaces/user';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

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

  getUsers() {
    return this.angularFirestore.collection('Users').valueChanges();
  }

  currentUser() {
    return this.angularFireAuth.currentUser;
  }

  async isOldPasswordCorrect(oldPassword: string): Promise<boolean> {
    const user = await this.currentUser();

    if (!user || !user.email) {
      console.error('Nincs bejelentkezett felhasználó vagy nincs email.');
      return false;
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );

    try {
      await user.reauthenticateWithCredential(credential);
      return true; // ha nem dob hibát, akkor helyes a jelszó
    } catch (error: any) {
      console.warn('Hibás jelszó vagy újrahitelesítési hiba:', error);
      return false;
    }
  }
}
