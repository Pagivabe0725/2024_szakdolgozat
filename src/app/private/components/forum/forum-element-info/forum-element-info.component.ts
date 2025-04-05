import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, take } from 'rxjs';
import { CollectionService } from '../../../../shared/services/collection.service';
import { forum } from '../../../../shared/interfaces/forum';
import { MatBadgeModule } from '@angular/material/badge';
import { PopupService } from '../../../../shared/services/popup.service';
import { Dialog } from '../../../../shared/interfaces/dialog';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { ArrayService } from '../../../services/array.service';
import { forumComment } from '../../../../shared/interfaces/forumComment';
import { idGenerator } from '../../../../shared/Functions/idGenerator';
import { Timestamp } from '@angular/fire/firestore';
import { user } from '../../../../shared/interfaces/user';
import { UserService } from '../../../../shared/services/user.service';
import { author } from '../../../../shared/Functions/author';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-forum-element-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatBadgeModule,
    SpinnerComponent,
  ],
  templateUrl: './forum-element-info.component.html',
  styleUrl: './forum-element-info.component.scss',
})
export class ForumElementInfoComponent implements OnInit, OnDestroy {
  private httpSub?: Subscription;
  private actualForumId!: string;
  private forumSub?: Subscription;
  private popupSub?: Subscription;
  private userSub?: Subscription;
  private dialogSub?: Subscription;
  protected actualForumElement?: forum;
  protected commentsOfActualForumElementArray?: forumComment[] = [];
  private popupDialogTemplate: Dialog;
  private actualUser?: user;
  public loaded = false;
  //  private commentSub?: Subscription;

  constructor(
    private actRout: ActivatedRoute,
    private collectionService: CollectionService,
    private popupService: PopupService,
    private navigationService: NavigateAndurlinfoService,
    private arrayService: ArrayService,
    private userService: UserService
  ) {
    this.popupDialogTemplate = this.popupService.getTemplateDialog();
    this.popupDialogTemplate.hostComponent = 'ForumElementInfoComponent';
  }

  ngOnInit(): void {
    this.httpSub = this.actRout.params.subscribe((data) => {
      this.actualForumId = data['forumId'];

      this.userSub = this.userService
        .getUserInfoByUserId(localStorage.getItem('userId')!)
        .subscribe((data) => {
          this.actualUser = data as user;
          this.loaded = true;
        });

      if (this.actualForumId) {
        this.forumSub = this.collectionService
          .getCollectionByCollectionAndDoc('Forums', this.actualForumId)
          .pipe(take(1))
          .subscribe((data) => {
            this.actualForumElement = data as forum;

            const commentObservables =
              this.actualForumElement.commentsIdArray.map((commentId) =>
                this.collectionService
                  .getCollectionByCollectionAndDoc('ForumComments', commentId)
                  .pipe(take(1))
              );
            forkJoin(commentObservables).subscribe((comments) => {
              this.commentsOfActualForumElementArray =
                comments as forumComment[];
            });
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.httpSub?.unsubscribe();
    this.forumSub?.unsubscribe();
    // this.commentSub?.unsubscribe();
    this.userSub?.unsubscribe();
    this.popupSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
  }

  isDarkmode(): boolean {
    const theme = localStorage.getItem('theme');
    return theme ? theme.includes('dark') : false;
  }

  didYouInteractWithThis(action: 'likeArray' | 'dislikeArray'): boolean {
    if (this.actualForumElement) {
      return this.arrayService.elementInArray(
        localStorage.getItem('userId')!,
        this.actualForumElement[action]
      );
    }
    return false;
  }

  numberOfSpecificAction(
    action: 'likeArray' | 'dislikeArray' | 'commentsIdArray'
  ): number {
    if (this.actualForumElement && this.actualForumElement[action]) {
      return this.actualForumElement[action].length;
    } else return 0;
  }

  /* 
  whichIndex(action: 'likeArray' | 'dislikeArray'): number {
    return this.arrayService.getIndex(
      localStorage.getItem('userId')!,
      this.actualForumElement![action]
    );
  }

  */

  isMyForumElement(): boolean {
    return this.actualForumElement?.userId === localStorage.getItem('userId');
  }

  arrayAction(action: 'likeArray' | 'dislikeArray'): void {
    if (this.didYouInteractWithThis(action)) {
      this.arrayService.deleteElementFromArray(
        localStorage.getItem('userId')!,
        this.actualForumElement![action]
      );
    } else {
      this.arrayService.addElementToArray(
        localStorage.getItem('userId')!,
        this.actualForumElement![action]
      );
    }
  }

  Interact(action: 'likeArray' | 'dislikeArray'): void {
    if (!this.isMyForumElement()) {
      this.arrayAction(action);
      if (
        action === 'dislikeArray' &&
        this.didYouInteractWithThis('likeArray')
      ) {
        this.arrayAction('likeArray');
      } else if (
        action === 'likeArray' &&
        this.didYouInteractWithThis('dislikeArray')
      ) {
        this.arrayAction('dislikeArray');
      }

      this.collectionService
        .updateDatas(
          'Forums',
          this.actualForumElement!.id,
          this.actualForumElement!
        )
        .then(() => {
          //console.log('sikeres');
        })
        .catch((err) => {});
    }
  }

  deleteForumElement() {
    this.popupDialogTemplate.title = 'Biztosan';
    this.popupDialogTemplate.content =
      'Biztosan törölni szeretné ezt a bejegyzést?';
    this.popupDialogTemplate.hasInput = false;
    this.popupDialogTemplate.action = true;
    this.popupSub = this.popupService
      .displayPopUp(this.popupDialogTemplate)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          for (const iterator of this.actualForumElement!.commentsIdArray) {
            this.collectionService
              .deleteDatas('ForumComments', iterator)
              .then(() => {
                console.log('delete forum element');
              })
              .catch((err) => console.error(err));
          }
          this.collectionService
            .deleteDatas('Forums', this.actualForumElement!.id)
            .then(() => {
              this.navigationService.navigate(true, 'forum');
            })
            .catch((err) => console.error(err));
        } else {
        }
      });
  }

  commentAction(): void {
    this.popupDialogTemplate.hasInput = true;
    this.popupDialogTemplate.action = true;
    this.popupDialogTemplate.title = 'Kommentelj';

    this.popupService
      .displayPopUp(this.popupDialogTemplate)
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          const comment: forumComment = this.createComment(data);
          this.collectionService
            .createCollectionDoc('ForumComments', comment.id, comment)
            .then(() => {
              this.actualForumElement!.commentsIdArray.push(comment.id);

              this.commentsOfActualForumElementArray?.push(comment);
              this.collectionService
                .updateDatas(
                  'Forums',
                  this.actualForumElement!.id,
                  this.actualForumElement
                )
                .then(() => {
                  console.log('comment action');
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
  }

  createComment(content: string): forumComment {
    return {
      id: idGenerator(),
      date: Timestamp.now(),
      author: author(this.actualUser!),
      userid: localStorage.getItem('userId')!,
      content: content,
    } as forumComment;
  }

  deleteComment(index: number) {
    const commentIdToDelete: string =
      this.actualForumElement!.commentsIdArray[index];

    this.popupDialogTemplate.action = true;
    this.popupDialogTemplate.hasInput = false;
    this.popupDialogTemplate.title = 'Biztosan?';
    this.popupDialogTemplate.content =
      'Biztosan törölni szeretnéd a kommentet?';

    this.dialogSub = this.popupService
      .displayPopUp(this.popupDialogTemplate)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loaded = false;
          this.collectionService
            .deleteDatas('ForumComments', commentIdToDelete)
            .then(() => {
              this.actualForumElement?.commentsIdArray.splice(index, 1);
              this.collectionService
                .updateDatas(
                  'Forums',
                  this.actualForumElement!.id,
                  this.actualForumElement
                )
                .then(() => {
                  window.location.reload();
                })
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => {
              this.loaded = false;
              console.error(err);
            });
        }
      });
  }

  isMyComment(uId: string): boolean {
    return localStorage.getItem('userId') === uId;
  }
}
