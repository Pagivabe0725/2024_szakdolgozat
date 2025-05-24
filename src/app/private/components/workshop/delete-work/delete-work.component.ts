import { Component, OnInit } from '@angular/core';
import { work } from '../../../../shared/interfaces/work';
import { firstValueFrom, take } from 'rxjs';
import { CollectionService } from '../../../../shared/services/collection.service';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { WorkCardElementComponent } from './work-card-element/work-card-element.component';
import { Dialog } from '../../../../shared/interfaces/dialog';
import { PopupService } from '../../../../shared/services/popup.service';
import { workMessage } from '../../../../shared/interfaces/workMessage';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-delete-work',
  standalone: true,
  imports: [SpinnerComponent, WorkCardElementComponent],
  templateUrl: './delete-work.component.html',
  styleUrl: './delete-work.component.scss',
})
export class DeleteWorkComponent implements OnInit {
  protected workArray: Array<work> = [];
  protected loaded = false;
  constructor(
    private collectionService: CollectionService,
    private popupService: PopupService,
    private storageService: StorageService
  ) {}

  async ngOnInit(): Promise<void> {
    const userId = localStorage.getItem('userId');
    const works = (await this.getAllWorkId()) as any;
    for (const work of works['docs']) {
      const actualWork = (await this.getWorkById((work as any)['id'])) as work;
      if (actualWork.userId === userId) {
        this.workArray.push(actualWork);
      }
    }
    console.log(this.workArray);
    this.loaded = true;
  }

  getAllWorkId(): Promise<unknown> {
    return firstValueFrom(
      this.collectionService.getAllDocByCollectionName('Works').pipe(take(1))
    );
  }

  getWorkById(id: string): Promise<unknown> {
    return firstValueFrom(
      this.collectionService
        .getCollectionByCollectionAndDoc('Works', id)
        .pipe(take(1))
    );
  }

  isDarkmode(): boolean {
    return localStorage.getItem('theme')!.includes('dark');
  }

  createDialog(): Dialog {
    return {
      ...this.popupService.getTemplateDialog(),
      title: 'Biztosan törli?',
      content: 'Biztosan törölni szeretnéd az adott munkamenetet?',
      action: true,
      hostComponent: 'DeleteWorkComponent',
    };
  }

  getWorkFromArrayById(id: string): work {
    let actualWork: work = {} as work;
    for (const work of this.workArray) {
      if (work.id === id) {
        actualWork = work;
        break;
      }
    }
    return actualWork;
  }

  deleteWorkFromArray(id: string): void {
    let index = -1;
    for (let i = 0; i < this.workArray.length; i++) {
      if (id === this.workArray[i].id) {
        index = i;
        break;
      }
    }
    if (index != -1) {
      this.workArray.splice(index, 1);
    }
  }

  delete(id: string): void {
    this.popupService
      .displayPopUp(this.createDialog())
      .afterClosed()
      .pipe(take(1))
      .subscribe(async (r) => {
        if (r) {
          this.loaded = false;
          await this.deleteMessages(this.getWorkFromArrayById(id));
          await this.collectionService.deleteDatas('Works', id);
          this.deleteWorkFromArray(id);
          this.loaded = true;
        }
      });
  }

  async deleteMessages(work: work): Promise<void> {
    if (work.elements.length > 0) {
      for (const message of work.elements) {
        const actualMessage = (await firstValueFrom(
          this.collectionService.getCollectionByCollectionAndDoc(
            'Messages',
            message
          )
        )) as workMessage;

        await this.deleteFiles(actualMessage.id);
        await this.collectionService.deleteDatas('Messages', message);
        await this.deleteComments(actualMessage.commentArray);
      }
    }
  }

  async deleteComments(commentArray: Array<string>): Promise<void> {
    if (commentArray.length > 0) {
      for (const comment of commentArray) {
        await this.collectionService.deleteDatas('WorkComments', comment);
      }
    }
  }

  async deleteFiles(filename: string): Promise<void> {
    let fileMessages = await this.storageService.listFolderContents('Works');
    if (fileMessages.includes(filename)) {
      console.log('bejutott');
      this.storageService.deleteFile(`Works/${filename}/munka.zip`);
    }
  }
}
