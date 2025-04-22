import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../../shared/services/user.service';
import { user } from '../../../../shared/interfaces/user';
import { Subscription, timestamp } from 'rxjs';
import { CollectionService } from '../../../../shared/services/collection.service';
import { work } from '../../../../shared/interfaces/work';
import { Timestamp } from '@angular/fire/firestore';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-work-creator',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './work-creator.component.html',
  styleUrl: './work-creator.component.scss',
})
export class WorkCreatorComponent implements OnInit {
  private actualId: number = 0;
  private userEmails: Array<string> = [];
  private users: Array<user> = [];
  public invalidEmails: Array<number> = [];
  public memberFormControls: Array<number> = [];
  public creatorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private userService: UserService,
    private collectionService: CollectionService,
    private sharedDataService: SharedDataService
  ) {
    this.addMember();
  }

  ngOnInit(): void {
    this.sharedDataService.currentData.subscribe((data) => {
      console.log(data);
    });
    const emails: Subscription = this.userService
      .getUsers()
      .subscribe((users: any) => {
        Array.from(users).forEach((user) => {
          this.userEmails.push((user as user).email);
          this.users.push(user as user);
        });
        emails.unsubscribe();
      });
  }

  increaseActualId(): void {
    this.actualId += 1;
  }

  addMember(): void {
    this.creatorForm.addControl(
      'member' + this.actualId,
      new FormControl('', [Validators.email, Validators.required])
    );
    this.memberFormControls.push(this.actualId);
    this.increaseActualId();
  }

  minusMember(): void {
    if (
      this.creatorForm.get(
        `member${this.memberFormControls[this.memberFormControls.length - 1]}`
      )!.invalid &&
      this.memberFormControls.length > 1
    ) {
      this.creatorForm.removeControl(
        `member${this.memberFormControls[this.memberFormControls.length - 1]}`
      );
      this.memberFormControls.pop();
    }
  }

  checkEmails(): void {
    this.invalidEmails = [];
    for (let i = 0; i < this.memberFormControls.length; i++) {
      const actualFormControl: string = (
        this.creatorForm.get(`member${this.memberFormControls[i]}`)!
          .value as string
      ).trim();
      if (actualFormControl !== '') {
        if (!this.userEmails.includes(actualFormControl)) {
          this.invalidEmails.push(i);
          this.creatorForm
            .get(`member${this.memberFormControls[i]}`)
            ?.setErrors(Validators.email);
        }
      }
    }
  }

  getMembersByValidEmails(): Array<string> {
    let helperArray: Array<string> = [];
    let helperArray2: Array<string> = [];
    let resultArray: Array<string> = [];
    for (let i = 0; i < this.memberFormControls.length; i++) {
      helperArray.push(
        this.creatorForm.get(`member${this.memberFormControls[i]}`)!.value
      );
    }
    for (let i = 0; i < helperArray.length; i++) {
      if (!helperArray2.includes(helperArray[i])) {
        if (this.getUserByEmail(helperArray[i])) {
          helperArray2.push(helperArray[i]);
          resultArray.push(this.getUserByEmail(helperArray[i]));
        }
      }
    }
    return resultArray;
  }

  getUserByEmail(email: string): string {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        return this.users[i].id;
      }
    }
    return '';
  }

  getUserById(id: string): user | undefined {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i];
      }
    }
    return undefined;
  }

  createWork(): void {
    this.checkEmails();
    if (this.creatorForm.valid) {
      const id: string = Timestamp.now() + localStorage.getItem('userId')!;
      const actualWork: work = {
        id: id,
        userId: localStorage.getItem('userId')!,
        name: this.creatorForm.get('name')!.value,
        author: this.getUserById(localStorage.getItem('userId')!)!,
        created: Timestamp.now(),
        modified: Timestamp.now(),
        finished: false,
        members: this.getMembersByValidEmails(),
      };
      this.collectionService
        .createCollectionDoc('Works', id, actualWork)
        .then()
        .catch((err) => console.error(err));
    } else {
    }
  }
}
