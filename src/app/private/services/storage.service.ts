import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import JSZip from 'jszip';
import { lastValueFrom, take } from 'rxjs';
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private angularFireStorage: AngularFireStorage) {}

  uploadFiles(path: string, fileArray: Array<File>):Promise<void> {
    const zip = new JSZip();
    for (const file of fileArray) {
      zip.file(file.name, file);
    }

    return zip.generateAsync({ type: 'blob' }).then(async (zipBlob) => {
      const zipPath = `Works/${path}/munka.zip`;

       lastValueFrom(
        this.angularFireStorage
          .upload(zipPath, zipBlob)
          .snapshotChanges()
          .pipe(take(1))
      );
    });
  }

  async listFolderContents(folderPath: string): Promise<string[]> {
    if (!folderPath.endsWith('/')) {
      folderPath += '/';
    }

    const storage = getStorage();
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);

    return result.prefixes.map((prefix) => prefix.name);
  }

  async downloadFile(path: string, fileName: string): Promise<void> {
    const storage = getStorage();
    const fileRef = ref(storage, path);
    const url = await getDownloadURL(fileRef);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

   deleteFile(path: string): Promise<void> {
    const storage = getStorage();
    const fileRef = ref(storage, path);
    return deleteObject(fileRef);
  }
}
