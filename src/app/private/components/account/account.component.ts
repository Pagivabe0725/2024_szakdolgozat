import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from '../../../shared/services/user.service';
import { user } from '../../../shared/interfaces/user';
import { firstValueFrom, take } from 'rxjs';
import { OwnDateFormaterPipe } from '../../../shared/pipes/own-date-formater.pipe';
import { Timestamp } from '@angular/fire/firestore';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { CollectionService } from '../../../shared/services/collection.service';
import { work } from '../../../shared/interfaces/work';
import { ArrayService } from '../../services/array.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    CommonModule,
    OwnDateFormaterPipe,
    SpinnerComponent,
    MatButtonModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private _actualUser!: user;
  public loaded = false;
  public keyTransleater: { [key: string]: string } = {
    firstName: 'Keresztnév:',
    lastName: 'Vezetéknév:',
    email: 'Email-címem:',
    gender: 'Nem',
    telNumber: 'Telefonszámom:',
    lastLogin: 'Utolsó bejelentkezésem:',
    city: 'Városom:',
    dateOfRegistration: 'Regisztráltam:',
  };
  public keyArray: Array<keyof user> = [];
  private myWorksArray: Array<work> = [];
  private userInWorks: Array<string> = [];
  public displayDatas = false;
  public modifyKeyValueObj = {
    Vezetéknév: 'lastName',
    Keresztnév: 'firstName',
    'Email-címem': 'email',
    Nem: 'gender',
    Telefonszámom: 'telNumber',
    Városom: 'city',
    Jelszó: 'password',
  };

  constructor(
    private userService: UserService,
    private collectionService: CollectionService,
    private arrayService: ArrayService
  ) {}

  async ngOnInit() {
    await this.getActualUser();
    const docs = await this.getDocsObj();
    const keyArray: string[] = (docs as any).docs.map((doc: any) => doc.id);

    for (const key of keyArray) {
      const work: work = (await this.getWorks(key)) as work;
      if (work.userId === localStorage.getItem('userId')) {
        this.myWorksArray.push(work);
      }
      work.members.forEach((user) => {
        this.userInWorks.push(user.id);
      });
      this.userInWorks.push(work.userId);
    }
    this.loaded = true;
    this.createWorkMatCardObject();
    await this.userService.currentUser().then((user)=>{
      console.log('itt a user')
      console.log(user)
    })
  }

  async getWorks(path: string) {
    return firstValueFrom(
      this.collectionService
        .getCollectionByCollectionAndDoc('Works', path)
        .pipe(take(1))
    );
  }

  async getActualUser(): Promise<void> {
    const user = await firstValueFrom(
      this.userService
        .getUserInfoByUserId(localStorage.getItem('userId')!)
        .pipe(take(1))
    );

    this._actualUser = user as user;
    this.keyArray = Object.keys(this.actualUser) as Array<keyof user>;
    this.keyArray.splice(this.keyArray.indexOf('id'), 1);
    this.checkKeyArray();
  }

  getDocsObj() {
    return firstValueFrom(
      this.collectionService.getAllDocByCollectionName('Works').pipe(take(1))
    );
  }

  lastProjeck(): Timestamp | undefined {
    if (this.myWorksArray.length > 0) {
      let last: Timestamp = this.myWorksArray[0].created;
      this.myWorksArray.forEach((i) => {
        last.toMillis() < i.created.toMillis()
          ? (last = i.created)
          : (last = last);
      });
      return last;
    }

    return undefined;
  }

  lastModifiedProjeck(): Timestamp | undefined {
    if (this.myWorksArray.length > 0) {
      let last: Timestamp = this.myWorksArray[0].modified;
      this.myWorksArray.forEach((i) => {
        last.toMillis() < i.modified.toMillis()
          ? (last = i.modified)
          : (last = last);
      });
      return last;
    }

    return undefined;
  }

  isDarkmode(): boolean {
    const theme = localStorage.getItem('theme');
    return theme ? theme.includes('dark') : false;
  }

  getWorksNumber(own: boolean): number {
    if (own) {
      return this.myWorksArray.length;
    }

    return this.arrayService.elementInArrayTimes(
      localStorage.getItem('userId')!,
      this.userInWorks
    );
  }

  isTimestamp(value: any): value is Timestamp {
    return value instanceof Timestamp;
  }

  checkKeyArray(): void {
    const copiedArray: Array<string> = [...this.keyArray];
    const order: Array<string> = [
      'lastName',
      'firstName',
      'email',
      'gender',
      'telNumber',
      'city',
      'lastLogin',
      'dateOfRegistration',
    ];

    if (
      [...copiedArray]
        .sort()
        .every((value, i) => value === [...order].sort()[i])
    ) {
      this.orderKeyArray(copiedArray, order);
      this.displayDatas = true;
    }
  }

  getObjectInArray(obj: object) {
    return Object.entries(obj);
  }

  orderKeyArray(copiedArray: string[], orderedArray: string[]): void {
    this.keyArray = [];

    orderedArray.forEach((i) => {
      this.keyArray.push(copiedArray[copiedArray.indexOf(i)] as keyof user);
    });
  }

  createWorkMatCardObject() {
    const object = {
      'Saját munkáim:': this.getWorksNumber(true),
      'Munkák amiben részt veszek:': this.getWorksNumber(false),
      'Utojára létrehozott munkám:': this.lastProjeck() || 'Nincs',
      'Utojára módosított munkám:': this.lastModifiedProjeck() || 'Nincs',
    };
    return this.getObjectInArray(object);
  }

  get actualUser() {
    return this._actualUser;
  }

  transformStringToKey(string: string) {
    return string as keyof user;
  }
}
