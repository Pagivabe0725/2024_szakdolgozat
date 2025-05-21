import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CollectionService } from '../../../../shared/services/collection.service';
import { Dialog } from '../../../../shared/interfaces/dialog';
import { PopupService } from '../../../../shared/services/popup.service';
import { Subscription, firstValueFrom, take } from 'rxjs';
import { forum } from '../../../../shared/interfaces/forum';
import { Timestamp } from '@angular/fire/firestore';
import { UserService } from '../../../../shared/services/user.service';
import { user } from '../../../../shared/interfaces/user';
import { idGenerator } from '../../../../shared/Functions/idGenerator';
import { author } from '../../../../shared/Functions/author';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-addforum',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './addforum.component.html',
  styleUrl: './addforum.component.scss',
})
export class AddforumComponent implements OnInit, OnDestroy {
  @HostListener('window:resize', ['$event']) reSize() {
    this.textAreaRowCalculator();
  }
  protected forumForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
    ]),
    category: new FormControl('', Validators.required),
  });
  protected categoryTitleArray: string[] = [];
  public loaded = false;
  private popupDialogTemplate: Dialog;
  private fullName = '';
  private nameSub?: Subscription;
  private collectionSub?: Subscription;
  protected modify: boolean = false;

  constructor(
    private navigationService: NavigateAndurlinfoService,
    private collectionService: CollectionService,
    private popupService: PopupService,
    private userService: UserService,
    private sharedDataService: SharedDataService
  ) {
    this.popupDialogTemplate = popupService.getTemplateDialog();
    this.popupDialogTemplate.hostComponent = 'AddforumComponent';
  }

  async ngOnInit() {
    const stored = sessionStorage.getItem('actualForum');
    let actualForum: forum | undefined;

    if (stored) {
      if (sessionStorage.getItem('actualForum') === '{}') {
        actualForum = undefined;
      } else {
        actualForum = JSON.parse(
          sessionStorage.getItem('actualForum')!
        ) as forum;
        this.forumForm.get('content')!.setValue(actualForum.text);
        this.forumForm.get('title')!.setValue(actualForum.title);
        this.forumForm.get('category')!.setValue(actualForum.category);
        this.modify = true;
      }
    } else {
      await firstValueFrom(
        this.sharedDataService.forumSource.pipe(take(1))
      ).then((r) => {
        if (JSON.stringify(r) !== '{}') {
          actualForum = r;
          sessionStorage.setItem('actualForum', JSON.stringify(r));
          this.forumForm.get('content')!.setValue(actualForum.text);
          this.forumForm.get('title')!.setValue(actualForum.title);
          this.forumForm.get('category')!.setValue(actualForum.category);
          this.modify = true;
        }
      });
    }

    this.getUserName();
    this.textAreaRowCalculator();
    this.collectionSub = this.collectionService
      .getCollectionByCollectionAndDoc('Categories', 'all')
      .subscribe((data) => {
        if (data) {
          this.categoryTitleArray = Object.values(data)[0];
          this.loaded = true;
        }
      });
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('actualForum');
    this.nameSub?.unsubscribe();
    this.collectionSub?.unsubscribe();
  }

  textAreaRowCalculator(): void {
    const textareaHeight: number = document.getElementById('textarea')
      ?.parentElement?.parentElement?.parentElement?.offsetHeight as number;
    (document.getElementById('textarea') as HTMLTextAreaElement).rows =
      Math.floor(textareaHeight / 26);
  }

  back(): void {
    this.navigationService.navigate(true, 'forum');
  }

  clearFormFields(): void {
    this.forumForm.reset();
  }

  check(): void {
    if (this.forumForm.valid) {
      this.popupDialogTemplate.title = !this.modify
        ? 'Hozzáadod?'
        : 'Módosítod?';
      this.popupDialogTemplate.content = !this.modify
        ? 'Biztosan szeretnéd hozzáadni a bejegyzésedet?'
        : 'Biztosan szeretnéd módosítani a bejegyzést?';
      this.popupDialogTemplate.action = true;
      this.popupService
        .displayPopUp(this.popupDialogTemplate)
        .afterClosed()
        .pipe(take(1))
        .subscribe((result) => {
          if (result) {
            if (this.modify) {
              this.editForum();
            } else {
              this.addForum();
            }
          }
        });
    }
  }

  addForum() {
    const actualForumElement: forum = this.createForumObject();
    this.collectionService
      .createCollectionDoc('Forums', actualForumElement.id, actualForumElement)
      .then(() => {
        this.back();
      })
      .catch((err) => {
        this.popupDialogTemplate.title = 'hiba!';
        this.popupDialogTemplate.content =
          'Valamilyen hibába ütköztünk a rögzítés során. Kérlek próbáld újra!';
        this.popupDialogTemplate.action = false;
        this.popupService.displayPopUp(this.popupDialogTemplate);
      });
  }

  editForum(): void {
    let editedForum = JSON.parse(
      sessionStorage.getItem('actualForum')!
    ) as forum;
    this.collectionService
      .updateDatas('Forums', editedForum.id, {
        ...editedForum,
        title: this.forumForm.get('title')!.value,
        text: this.forumForm.get('content')!.value,
        category: this.forumForm.get('category')!.value,
        date: Timestamp.now(),
      } as forum)
      .then(() => this.back())
      .catch((err) => {
        this.popupDialogTemplate.title = 'hiba!';
        this.popupDialogTemplate.content =
          'Valamilyen hibába ütköztünk a rögzítés során. Kérlek próbáld újra!';
        this.popupDialogTemplate.action = false;
        this.popupService.displayPopUp(this.popupDialogTemplate);
      });
  }

  getUserName(): void {
    this.nameSub = this.userService
      .getUserInfoByUserId(localStorage.getItem('userId')!)
      .subscribe((data) => {
        const user: user = data as user;
        this.fullName = author(user);
      });
  }

  createForumObject(): forum {
    return {
      userId: localStorage.getItem('userId'),
      id: idGenerator(),
      author: this.fullName,
      date: Timestamp.now(),
      text: this.forumForm.get('content')!.value,
      title: this.forumForm.get('title')!.value,
      category: this.forumForm.get('category')!.value,
      commentsIdArray: [],
      dislikeArray: [],
      likeArray: [],
    } as forum;
  }
}
