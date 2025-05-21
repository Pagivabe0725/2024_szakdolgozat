import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PopupService } from '../../../../shared/services/popup.service';
import { firstValueFrom, take } from 'rxjs';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { idGenerator } from '../../../../shared/Functions/idGenerator';
import { ActivatedRoute } from '@angular/router';
import { work } from '../../../../shared/interfaces/work';
import { CollectionService } from '../../../../shared/services/collection.service';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { workMessage } from '../../../../shared/interfaces/workMessage';
import { Timestamp } from '@angular/fire/firestore';
import { StorageService } from '../../../services/storage.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { Dialog } from '../../../../shared/interfaces/dialog';

@Component({
  selector: 'app-message-comment',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './message-comment.component.html',
  styleUrl: './message-comment.component.scss',
})
export class MessageCommentComponent implements OnInit, OnDestroy {
  protected fileArray: Array<File> = [];
  public loaded = false;
  private actualWork!: work;
  protected messageInput: FormControl = new FormControl('', [
    Validators.required,
  ]);
  protected modify = false;

  constructor(
    private popupService: PopupService,
    private actRoute: ActivatedRoute,
    private collectionService: CollectionService,
    private sharedDataService: SharedDataService,
    private navigateAndURLInfoService: NavigateAndurlinfoService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    let actualMessage: workMessage | undefined = undefined;

    if (sessionStorage.getItem('actualMessage')) {
      actualMessage =
        sessionStorage.getItem('actualMessage') !== '{}'
          ? JSON.parse(sessionStorage.getItem('actualMessage')!)
          : undefined;
      this.messageInput.setValue(actualMessage ? actualMessage.content : '');
      this.modify = actualMessage ? true : false;
    } else {
      await firstValueFrom(
        this.sharedDataService.workElementContentSource.pipe(take(1))
      ).then((r) => {
        if (JSON.stringify(r) !== '{}') {
          actualMessage = r;
          sessionStorage.setItem('actualMessage', JSON.stringify(r));
          this.messageInput.setValue(
            actualMessage ? actualMessage.content : ''
          );
          this.modify = actualMessage ? true : false;
        }
      });
    }

    this.actRoute.params.pipe(take(1)).subscribe(async (params) => {
      this.actualWork = await this.getActualWork(params['workId']);
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('actualMessage');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!this.isFileNameExist(file['name'])) {
        this.fileArray.push(file);
      } else {
        this.popupService.displayPopUp({
          ...this.popupService.getTemplateDialog(),
          action: false,
          title: 'Már létezik ilyen nevű fájl',
          content: 'Kérlek nevezd át a fájlt',
          hostComponent: 'MessageCommentComponent',
        });
      }
    }

    input.value = '';
  }

  async getActualWork(id: string) {
    const work = await firstValueFrom(
      this.collectionService
        .getCollectionByCollectionAndDoc('Works', id)
        .pipe(take(1))
    );
    return work as work;
  }

  deleteFileWithIndex(index: number): void {
    if (index <= this.fileArray.length - 1 && index >= 0) {
      this.popupService
        .displayPopUp({
          ...this.popupService.getTemplateDialog(),
          action: true,
          hostComponent: 'MessageCommentComponent',
          title: 'Biztosan Törlöd?',
          content: `Biztosan törlöd a következő elemet: ${this.fileArray[index]['name']}`,
        })
        .afterClosed()
        .pipe(take(1))
        .subscribe((result) => {
          if (result) {
            this.fileArray.splice(index, 1);
          }
        });
    }
  }

  isDarkmode(): boolean {
    const theme = localStorage.getItem('theme');
    return theme ? theme.includes('dark') : false;
  }

  isFileNameExist(name: string): boolean {
    const helperArray: Array<string> = [];
    this.fileArray.forEach((i) => {
      helperArray.push(i['name']);
    });
    return helperArray.includes(name);
  }

  clearInput(): void {
    this.messageInput.setValue('');
    this.messageInput.setErrors(null);
  }

  clearFileRow(): void {
    this.fileArray = [];
  }

  createId(): string {
    const id = this.actualWork.userId + '-' + idGenerator();
    return id;
  }

  createMessage(id: string): workMessage {
    return {
      id: id,
      userId: localStorage.getItem('userId'),
      content: this.messageInput.value,
      commentArray: [],
      dateOfCreation: Timestamp.now(),
    } as workMessage;
  }

  checkInput(): boolean {
    this.messageInput.markAsTouched();
    this.messageInput.updateValueAndValidity();
    return this.messageInput.valid;
  }

  async updateWork(message: workMessage): Promise<void> {
    this.actualWork.modified = Timestamp.now();
    this.actualWork.elements.push(message.id);
    await this.collectionService.updateDatas(
      'Works',
      this.actualWork.id,
      this.actualWork
    );
  }

  addAndEditDialog() {
    if(this.checkInput()){
    const dialog = {
      ...this.popupService.getTemplateDialog(),
      title: this.modify ? 'Biztosan módosítod' : 'Biztosan hozzáadod?',
      content: `Biztosan szeretnid ${
        this.modify ? 'módosítani' : 'hozzáadni'
      } ezt a bejegyzést?`,
      action: true,
      hostComponent: 'MessageCommentComponent',
    } as Dialog;

    this.popupService
      .displayPopUp(dialog)
      .afterClosed()
      .pipe(take(1))
      .subscribe((r) => {
        if (r) {
          this.modify ? this.editMessage() : this.addMessage();
        }
      });
    }
  }

  async addMessage(): Promise<void> {
    if (this.checkInput()) {
      const messageId = this.createId();
      const message: workMessage = this.createMessage(messageId);
      await this.collectionService.updateDatas('Messages', messageId, message);
      this.updateWork(message);

      if (this.fileArray.length > 0) {
        this.storageService
          .uploadFiles(messageId, this.fileArray)
          .then(async (r) => {
            this.loaded = false;
            await new Promise((resolve) => setTimeout(resolve, 1000));

            this.navigateAndURLInfoService.basicNavigate(
              `private/workshop/${this.actualWork.id}`
            );
          });
      } else {
        this.navigateAndURLInfoService.basicNavigate(
          `private/workshop/${this.actualWork.id}`
        );
      }
    }
  }

  async editMessage(): Promise<void> {
    if (this.checkInput()) {
      const message: workMessage = JSON.parse(
        sessionStorage.getItem('actualMessage')!
      ) as workMessage;
      await this.collectionService.updateDatas('Messages', message.id, {
        ...message,
        dateOfCreation: Timestamp.now(),
        content: this.messageInput.value,
      } as workMessage);
      this.navigateAndURLInfoService.basicNavigate(
        `private/workshop/${this.actualWork.id}`
      );
    }
  }
}
