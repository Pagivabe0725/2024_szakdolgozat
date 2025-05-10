import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private angularFireStorage: AngularFireStorage) {}

  uploadFiles(path: string, fileArray: Array<File>) {
    for (const file of fileArray) {
      this.angularFireStorage.upload('Works/'+path+'/'+file['name'], file).then(
        (r)=>{console.log(r)}
      );
    }
  }
}
