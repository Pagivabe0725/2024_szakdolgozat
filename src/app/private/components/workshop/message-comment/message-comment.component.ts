import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class MessageCommentComponent implements OnInit {
  protected fileArray: Array<File> = [];
  public loaded = false;
  private actualWork!: work;
  protected messageInput: FormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private popupService: PopupService,
    private actRoute: ActivatedRoute,
    private collectionService: CollectionService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.pipe(take(1)).subscribe(async (params) => {
      this.actualWork = await this.getActualWork(params['workId']);
      this.loaded = true;
    });
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

  async updateWork(message:workMessage): Promise<void> {
    this.actualWork.modified = Timestamp.now();
    this.actualWork.elements.push(message.id)
    await this.collectionService.updateDatas(
      'Works',
      this.actualWork.id,
      this.actualWork
    );
  }

  async addMessage(): Promise<void> {
    if (this.checkInput()) {
      const messageId = this.createId();
      const message : workMessage = this.createMessage(messageId)
      await this.collectionService.updateDatas('Messages',messageId,message)
      this.updateWork(message)
    }
  }
}
