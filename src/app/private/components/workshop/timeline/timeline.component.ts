import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkMessageComponent } from './work-message/work-message.component';
import { WorkMessageCommentComponent } from './work-message-comment/work-message-comment.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { Subscription, firstValueFrom, forkJoin, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { work } from '../../../../shared/interfaces/work';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { workMessage } from '../../../../shared/interfaces/workMessage';
import { OwnDateFormaterPipe } from '../../../../shared/pipes/own-date-formater.pipe';
import { user } from '../../../../shared/interfaces/user';
import { Dialog } from '../../../../shared/interfaces/dialog';
import { PopupService } from '../../../../shared/services/popup.service';
import { workComment } from '../../../../shared/interfaces/workComment';
import { idGenerator } from '../../../../shared/Functions/idGenerator';
import { Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    WorkMessageComponent,
    WorkMessageCommentComponent,
    CommonModule,
    SpinnerComponent,
    ControlpanelComponent,
    OwnDateFormaterPipe,
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent implements OnInit, OnDestroy {
  protected loaded = false;
  protected actualWork!: work;
  protected messages: Array<workMessage> = [];
  protected membersOfWork: Map<string, user> = new Map();
  protected workCommentMap: Map<string, workComment> = new Map();
  private lastMessageSub?: Subscription;

  constructor(
    private collectionService: CollectionService,
    private router: ActivatedRoute,
    private popupService: PopupService,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.router.params.pipe(take(1)).subscribe(async (param) => {
      const work = await firstValueFrom(
        this.collectionService
          .getCollectionByCollectionAndDoc('Works', param['workId'])
          .pipe(take(1))
      );
      this.actualWork = work as work;

      await this.getMessages();
      await this.setMemberOfWork();
      await this.getComments();
      this.messages.sort(
        (a, b) => Number(a.dateOfCreation) - Number(b.dateOfCreation)
      );

      this.lastMessageSub = this.collectionService
        .getCollectionByCollectionAndDoc(
          'Messages',
          this.messages[this.messages.length - 1].id
        )
        .subscribe(async () => {
          await this.getComments();
          this.loaded = true;
        });
    });
  }

  ngOnDestroy(): void {
    if (this.lastMessageSub) {
      this.lastMessageSub.unsubscribe();
    }
  }

  scrollToBottom(): void {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  isDarkmode(): boolean {
    return localStorage.getItem('theme')!.includes('dark');
  }

  async setMemberOfWork(): Promise<void> {
    for (const member of this.actualWork.members) {
      const user = await firstValueFrom(
        this.collectionService
          .getCollectionByCollectionAndDoc('Users', member)
          .pipe(take(1))
      );

      this.membersOfWork.set((user as user).id, user as user);
    }
    const user = await firstValueFrom(
      this.collectionService
        .getCollectionByCollectionAndDoc('Users', this.actualWork.author.id)
        .pipe(take(1))
    );
    this.membersOfWork.set((user as user).id, user as user);
  }

  async getMessages(): Promise<void> {
    this.messages = [];
    for (const messageId of this.actualWork.elements) {
      const messageFromDatabase = await firstValueFrom(
        this.collectionService
          .getCollectionByCollectionAndDoc('Messages', messageId)
          .pipe(take(1))
      );
      this.messages?.push(messageFromDatabase as workMessage);
    }
  }

  async getComments() {
    //this.workCommentMap= new Map()
    for (const message of this.messages) {
      for (const comment of message.commentArray) {
        const actualComment = await firstValueFrom(
          this.collectionService
            .getCollectionByCollectionAndDoc('WorkComments', comment)
            .pipe(take(1))
        );
        this.workCommentMap.set(comment, actualComment as workComment);
      }
    }
  }

  createCommentObject(content: string): workComment {
    const comment: workComment = {
      id: idGenerator(),
      author: this.membersOfWork.get(localStorage.getItem('userId')!)!,
      content: content,
      dateOfCreation: Timestamp.now(),
    };
    return comment;
  }

  getMessageIndexByCommentId(commentId: string): number {
    let result = -1;
    this.messages.forEach((message, index) => {
      if (message.commentArray.includes(commentId)) {
        result = index;
      }
    });

    return result;
  }

  async deleteComment(id: string) {
    // await this.collectionService.updateDatas('WorkComment', id, null);

    const dialog: Dialog = {
      ...this.popupService.getTemplateDialog(),
      hasInput: false,
      title: 'Törlés?',
      action: true,
      content: 'Biztosan törölni szeretnéd a kommentet?',
    };

    this.popupService
      .displayPopUp(dialog)
      .afterClosed()
      .pipe(take(1))
      .subscribe(async (r) => {
        if (r) {
          if (this.getMessageIndexByCommentId(id) >= 0) {
            this.loaded = false;
            const message = this.messages[this.getMessageIndexByCommentId(id)];
            message.commentArray.splice(message.commentArray.indexOf(id), 1);
            await this.collectionService.updateDatas(
              'Messages',
              message.id,
              message
            );
            await this.collectionService.deleteDatas('WorkComments', id);
            this.loaded = true;
            this.scrollToBottom();
          }
        }
      });
  }

  createSnackbar(text: string) {
    navigator.clipboard.writeText(text);
    this.snackBar.open(text, 'Bezár', {
      duration: 3000,
      announcementMessage: text,
      panelClass: ['own-custom-snackbar'],
      verticalPosition: 'bottom' //
    });
  }

  createComment(index: number) {
    const dialog: Dialog = {
      ...this.popupService.getTemplateDialog(),
      hasInput: true,
      title: 'Írd le a kommented',
      action: true,
    };
    this.popupService
      .displayPopUp(dialog)
      .afterClosed()
      .pipe(take(1))
      .subscribe((r) => {
        if (r) {
          this.loaded = false;
          const comment = this.createCommentObject(r);
          this.messages[index].commentArray.push(comment.id);

          this.collectionService
            .updateDatas(
              'Messages',
              this.messages[index].id,
              this.messages[index]
            )
            .then(() => {
              this.collectionService.createCollectionDoc(
                'WorkComments',
                comment.id,
                comment
              );
              
            })
            .catch(() => (this.loaded = false));
        }
      });
  }

  modifyComment(comment: { id: string; content: string }) {
    const dialog: Dialog = {
      ...this.popupService.getTemplateDialog(),
      title: 'Módosítod a kommentet?',
      inputContent: comment.content,
      hasInput: true,
      action: true,
    };
    this.popupService
      .displayPopUp(dialog)
      .afterClosed()
      .pipe(take(1))
      .subscribe((r) => {
        if (r && r !== comment.content) {
          let actualComment = this.workCommentMap.get(comment.id);
          actualComment!.content = r;

          this.collectionService
            .updateDatas('WorkComments', actualComment!.id, actualComment)
            .then(() => {
              this.workCommentMap.set(actualComment!.id, actualComment!);
              this.createSnackbar('komment módosítva')
            });
        }

        else if(r && r=== comment.content ){
          this.createSnackbar('A komment változtatás hiányában nem módosult')
        }
      });
  }
}
