import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private angularFirestore: AngularFirestore) {}

  getCollectionByCollectionAndDoc(
    collection: string,
    doc: string
  ): Observable<unknown> {
    return this.angularFirestore.collection(collection).doc(doc).valueChanges();
  }

  getAllDocByCollectionName(collection: string): Observable<unknown> {
    return this.angularFirestore.collection(collection).get();
  }

  getAllDocByCollectionNameWithChanges(collection: string): Observable<unknown> {
    return this.angularFirestore.collection(collection).valueChanges();
  }

  
  createCollectionDoc(
    collection: string,
    id: string,
    data: any
  ): Promise<void> {
    return this.angularFirestore.collection(collection).doc(id).set(data);
  }

  updateDatas(collection: string, doc: string, field: any): Promise<void> {
    return this.angularFirestore.collection(collection).doc(doc).set(field);
  }

  deleteDatas(collection: string, doc: string): Promise<void> {
    return this.angularFirestore.collection(collection).doc(doc).delete();
  }
}
