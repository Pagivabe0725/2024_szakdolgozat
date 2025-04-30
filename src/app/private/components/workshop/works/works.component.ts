import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WorkcardComponent } from '../workcard/workcard.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { work } from '../../../../shared/interfaces/work';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { Subscription, firstValueFrom, take } from 'rxjs';

import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { user } from '../../../../shared/interfaces/user';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [WorkcardComponent, SpinnerComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent implements OnInit, OnDestroy {
  protected worksArray: Array<work> = [];
  protected chosenWorksArray: Array<work> = [];
  protected loaded = false;
  protected workSub?: Subscription;

  constructor(
    private navigateAndURLInfoService: NavigateAndurlinfoService,
    private sharedDataService: SharedDataService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    const endpoint = this.navigateAndURLInfoService.endpoint();
    this.workSub = this.collectionService
      .getAllDocByCollectionName('Works')
      .subscribe(async (data: any) => {
        this.loaded = false;
        let workSet = new Set<work>();
        for (const i of data['docs']) {
          const a = await this.getWorkById(i['id']);
          if (a) {
            workSet.add(a);
          }
          console.log(i['id']);
        }

        for (const i of workSet) {
          this.worksArray.push(i);
        }
        const infoArray: Array<Array<string>> =
          await this.createEmailAndNameArray();
        this.setChoosenArray();
        if (endpoint === 'my') {
          const userId = localStorage.getItem('userId');
          this.chosenWorksArray = this.chosenWorksArray.filter(
            (fil) => fil.author.id === userId
          );
        }
        await this.sharedDataService.setActualUserWorkInfoArray(infoArray);
        this.loaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.workSub) {
      this.workSub.unsubscribe();
    }
  }

  async getWorkById(id: unknown): Promise<work> {
    const work = await firstValueFrom(
      this.collectionService
        .getCollectionByCollectionAndDoc('Works', id as any)
        .pipe(take(1))
    );

    return work as work;
  }

  setChoosenArray() {
    this.worksArray.forEach((e) => {
      this.chosenWorksArray.push(e);
    });
  }

  async createEmailAndNameArray() {
    let emailArray: Array<string> = [];
    let nameArray: Array<string> = [];

    for (const work of this.worksArray) {
      for (const memberId of work.members) {
        if (memberId !== localStorage.getItem('userId')!) {
          const userData = await firstValueFrom(
            this.collectionService
              .getCollectionByCollectionAndDoc('Users', memberId)
              .pipe(take(1))
          );
          emailArray.push((userData as user).email);
        }
      }
    }

    this.worksArray.forEach((e) => {
      nameArray.push(e.name);
    });

    emailArray = Array.from(new Set(emailArray));
    nameArray = Array.from(new Set(nameArray));
    return [emailArray, nameArray];
  }
  /*
  async ngOnInit() {
    const endpoint = this.navigateAndURLInfoService.endpoint();
    const query = await this.getAllWorks();
    const userId = localStorage.getItem('userId');
    //await this.addElementsToWorkArray(query);
    query.subscribe((data: any) => {
      console.log(data);
      Array.from(data['docs']).forEach(async (i) => {
        this.worksArray=[]
        await this.addElementsToWorkArray(data);
      });
    });
    const infoArray: Array<Array<string>> =
      await this.createEmailAndNameArray();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.setChoosenArray();
    if (endpoint === 'my') {
      const userId = localStorage.getItem('userId');
      this.chosenWorksArray = this.chosenWorksArray.filter(
        (fil) => fil.author.id === userId
      );
    }
    this.sharedDataService.setActualUserWorkInfoArray(infoArray);
    this.loaded = true;
  }

  getAllWorks() {
    return this.collectionService.getAllDocByCollectionName('Works');
  }

  async addElementsToWorkArray(data: unknown): Promise<void> {
    const array = Array.from((data as any)['docs']);
    const userId = localStorage.getItem('userId');

    for (const e of array) {
      const result = await firstValueFrom(
        this.collectionService
          .getCollectionByCollectionAndDoc('Works', (e as any)['id'])
          .pipe(
            take(1),
            filter(
              (fil) =>
                (fil as work).userId === userId ||
                (fil as work).members.includes(userId!)
            )
          )
      ).catch(() => null);

      if (result) {
        this.worksArray.push(result as work);
      }
    }
  }

  setChoosenArray() {
    this.worksArray.forEach((e) => {
      this.chosenWorksArray.push(e);
    });
  }

  async createEmailAndNameArray() {
    let emailArray: Array<string> = [];
    let nameArray: Array<string> = [];

    for (const work of this.worksArray) {
      for (const memberId of work.members) {
        if (memberId !== localStorage.getItem('userId')!) {
          const userData = await firstValueFrom(
            this.collectionService
              .getCollectionByCollectionAndDoc('Users', memberId)
              .pipe(take(1))
          );
          emailArray.push((userData as user).email);
        }
      }
    }

    this.worksArray.forEach((e) => {
      nameArray.push(e.name);
    });

    emailArray = Array.from(new Set(emailArray));
    nameArray = Array.from(new Set(nameArray));
    return [emailArray, nameArray];
  }
  */
}
