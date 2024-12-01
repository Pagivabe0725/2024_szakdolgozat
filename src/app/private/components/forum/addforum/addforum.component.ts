import { Component, HostListener, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { forum } from '../../../../shared/interfaces/forum';
import { Timestamp } from '@angular/fire/firestore';
import { UserService } from '../../../../shared/services/user.service';
import { user } from '../../../../shared/interfaces/user';
import { idGenerator } from '../../../../shared/Functions/idGenerator';
import { author } from '../../../../shared/Functions/author';

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
export class AddforumComponent implements OnInit {
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
  protected categoryTitleArray: Array<string> = [];
  public loaded: boolean = false;
  private popupDialogTemplate: Dialog;
  private fullName: string = '';

  constructor(
    private navigationService: NavigateAndurlinfoService,
    private collectionService: CollectionService,
    private popupService: PopupService,
    private userService: UserService
  ) {
    this.popupDialogTemplate = popupService.getTemplateDialog();
    this.popupDialogTemplate.hostComponent = 'AddforumComponent';
  }

  ngOnInit(): void {
    this.getUserName();
    this.textAreaRowCalculator();
    let collectionSub: Subscription = this.collectionService
      .getCollectionByCollectionAndDoc('Categories', 'all')
      .subscribe((data) => {
        if (data) {
          this.categoryTitleArray = Object.values(data)[0];
          this.loaded = true;
          collectionSub.unsubscribe();
        }
      });
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

  check() {
    if (this.forumForm.valid) {
      this.popupDialogTemplate.title = 'Hozzáadod?';
      this.popupDialogTemplate.content =
        'Biztosan szeretnéd hozzáadni a bejegyzésedet?';
      this.popupDialogTemplate.action = true;
      let popupSub: Subscription = this.popupService
        .displayPopUp(this.popupDialogTemplate)
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.addForm();
          }
          popupSub.unsubscribe();
        });
    }
  }

  addForm() {
    const actualForumElement: forum = this.createForumObject();
    this.collectionService
      .createCollectionDoc('Forums', actualForumElement.id, actualForumElement)
      .then(() => {
        this.back();
      })
      .catch((err) => {
        console.error(err);
        this.popupDialogTemplate.title = 'hiba!';
        this.popupDialogTemplate.content =
          'Valamilyen hibába ütköztünk a rögzítés során. Kérlek próbáld újra!';
        this.popupDialogTemplate.action = false;
        this.popupService.displayPopUp(this.popupDialogTemplate);
      });
  }

  getUserName(): void {
    let nameSub: Subscription = this.userService
      .getUserInfoByUserId(localStorage.getItem('userId')!)
      .subscribe((data) => {
        const user: user = data as user;
        this.fullName= author(user)
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
