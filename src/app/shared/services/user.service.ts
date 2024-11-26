import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { user } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private angularFirestore: AngularFirestore) {}

  createNewUser(user: user): Promise<void> {
    return this.angularFirestore
      .collection<user>('Users')
      .doc(user.id)
      .set(user);
  }
}
