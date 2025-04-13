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

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    CommonModule,
    OwnDateFormaterPipe,
    SpinnerComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private _actualUser!: user;
  public loaded = false;
  public keyTransleater: { [key: string]: string } = {
    firstName: 'Keresztnév',
    lastName: 'Vezetéknév',
    email: 'Email-címem:',
    telNumber: 'Telefonszámom',
    lastLogin: 'Utolsó bejelentkezésem',
    city: 'Városom',
    dateOfRegistration: 'Regisztráltam',
  };
  public keyArray: Array<keyof user> = [];
  private myWorksArray: Array<work> = [];
  private userInWorks: Array<string> = [];

  constructor(
    private userService: UserService,
    private collectionService: CollectionService
  ) {}

  async ngOnInit() {
    await this.getActualUser();
    const docs = await this.getDocsObj();
    const keyArray: string[] = (docs as any).docs.map((doc: any) => doc.id);
    console.log(keyArray);
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

    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('this.myWorksArray');
    console.log(this.myWorksArray);
    console.log('this.userInWorks');
    console.log(this.userInWorks);
    console.log('utolso időpont');
    console.log(this.lastProjeck()?.toDate());
    console.log('utolso módosított időpont');
    console.log(this.lastModifiedProjeck()?.toDate());
    this.loaded = true;
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
  }

  getDocsObj() {
    return firstValueFrom(
      this.collectionService.getAllDocByCollectionName('Works').pipe(take(1))
    );
  }

  lastProjeck(): Timestamp | undefined {
    if (this.myWorksArray) {
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
    if (this.myWorksArray) {
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

  isTimestamp(value: any): value is Timestamp {
    return value instanceof Timestamp;
  }

  orderKeyArray(): void {
    const copyedArray: Array<string> = [...this.keyArray];

    const order: Array<string> = [''];
  }

  get actualUser() {
    return this._actualUser;
  }
}
