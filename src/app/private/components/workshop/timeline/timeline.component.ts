import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkMessageComponent } from './work-message/work-message.component';
import { WorkMessageCommentComponent } from './work-message-comment/work-message-comment.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { Subscription, firstValueFrom, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { work } from '../../../../shared/interfaces/work';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { workMessage } from '../../../../shared/interfaces/workMessage';
import { OwnDateFormaterPipe } from '../../../../shared/pipes/own-date-formater.pipe';
import { user } from '../../../../shared/interfaces/user';
import { Dialog } from '../../../../shared/interfaces/dialog';
import { PopupService } from '../../../../shared/services/popup.service';

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
  private actualWorkSub?: Subscription;
  protected actualWork!: work;
  protected messages: Array<workMessage> = [];
  protected membersOfWork: Map<string, user> = new Map();

  constructor(
    private collectionService: CollectionService,
    private router: ActivatedRoute,
    private popupService: PopupService
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
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.actualWorkSub) {
      this.actualWorkSub.unsubscribe();
    }
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
    for (const messageId of this.actualWork.elements) {
      const messageFromDatabase = await firstValueFrom(
        this.collectionService
          .getCollectionByCollectionAndDoc('Messages', messageId)
          .pipe(take(1))
      );
      this.messages?.push(messageFromDatabase as workMessage);
    }
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
        console.log(r);
      });
  }
}
