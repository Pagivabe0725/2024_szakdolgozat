import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeftSideControllerComponent } from './left-side-controller/left-side-controller.component';
import { CollectionService } from '../../../shared/services/collection.service';
import { SharedDataService } from '../../services/shared-data.service';
import { work } from '../../../shared/interfaces/work';
import { Observable, Subscription, filter, firstValueFrom, take } from 'rxjs';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';
import { WorksComponent } from './works/works.component';
import { WorkCreatorComponent } from './work-creator/work-creator.component';
import { user } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [
    LeftSideControllerComponent,
    SpinnerComponent,
    WorksComponent,
    WorkCreatorComponent,
  ],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss',
})
export class WorkshopComponent implements OnInit, OnDestroy {
  protected workArray: Array<work> = [];
  protected chosenWorksArray: Array<work> = [];
  protected workSub?: Subscription;
  protected workObs?: Observable<unknown>;
  protected userSub?: Subscription;
  protected userObs?: Observable<unknown>;
  protected userArray: Array<user> = [];
  protected page = 'all';
  protected loaded = false;
  protected emailAndNameArray?: Array<Array<string>>;

  constructor(
    private navigateAndURLInfoService: NavigateAndurlinfoService,
    private sharedDataService: SharedDataService,
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    this.userObs = this.getSubscription('Users');
    this.userSub = this.userObs.subscribe(async (data: any) => {
      this.userArray = [];
      this.userArray = data;
    });

    this.workObs = this.getSubscription('Works');
    this.workSub = this.workObs.subscribe(async (data: any) => {
      this.loaded = false;
      this.workArray = [];
      this.workArray = data;
      this.basicWorkArrayFilter();
      this.chosenWorksArray = [...this.workArray];
      this.emailAndNameArray = await this.createEmailAndNameArray();
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.workSub) {
      this.workSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  async changePage(page: string) {
    this.loaded = false;
    this.page = page;
    if (page === 'all' || page === 'my') {
      this.workArrayFilter(page);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    this.loaded = true;
  }

  basicWorkArrayFilter(): void {
    const userId = localStorage.getItem('userId') || 'none';
    this.workArray = this.workArray.filter(
      (item) =>
        userId !== 'none' &&
        (item.author.id === userId || item.members.includes(userId))
    );
  }

  workArrayFilter(endpoint: string): void {
    if (endpoint === 'my') {
      const userId = localStorage.getItem('userId');
      this.chosenWorksArray = this.chosenWorksArray.filter(
        (fil) => fil.author.id === userId
      );
    } else {
      this.chosenWorksArray = [...this.workArray];
    }
  }

  getSubscription(collection: string): Observable<unknown> {
    return this.collectionService.getAllDocByCollectionNameWithChanges(
      collection
    );
  }

  async createEmailAndNameArray(): Promise<Array<Array<string>>> {
    let nameSet = new Set<string>();
    let emailSet = new Set<string>();
    const userId = localStorage.getItem('userId');
    for (const i of this.workArray) {
      nameSet.add(i.name);

      i.members.forEach((m) => {
        this.userArray.forEach((u) => {
          if (u.id.trim() !== userId!.trim()) {
            if (u.id.trim() === m.trim()) {
              emailSet.add(u.email);
            }
          }
        });
      });

      if (i.author.id !== userId) {
        emailSet.add(i.author.email);
      }
    }
    return [Array.from(emailSet), Array.from(nameSet)];
  }

  async getUserById(id: string) {
    const user = await firstValueFrom(
      this.collectionService
        .getCollectionByCollectionAndDoc('Users', id)
        .pipe(take(1))
    );

    return user as user;
  }
}
