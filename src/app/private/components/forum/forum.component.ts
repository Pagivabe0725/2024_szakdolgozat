import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeftsideConsoleComponent } from './leftside-console/leftside-console.component';
import { CardElementComponent } from './card-element/card-element.component';
import { forum } from '../../../shared/interfaces/forum';
import { MatButtonModule } from '@angular/material/button';

import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeInAnimations } from '../../../shared/animations/fadeIn.animation';
import { CollectionService } from '../../../shared/services/collection.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { Subscription, firstValueFrom, take } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    LeftsideConsoleComponent,
    CardElementComponent,
    MatButtonModule,
    SpinnerComponent,
    MatPaginatorModule,
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss',
  animations: [
    trigger('forumElementsAnimation', [
      transition('* <=> *', [useAnimation(fadeInAnimations)], {}),
    ]),
  ],
})
export class ForumComponent implements OnInit, OnDestroy {
  public forumObjectArray: forum[] = [];
  public chosenForumObjectArray: forum[] = [];
  public categoryArray: string[] = [];
  public loaded = false;
  private keyArray: string[] = [];
  private collectionSub?: Subscription;
  private forumKeysSub?: Subscription;
  public actualCategory = 'Összes';

  constructor(private collectionService: CollectionService) {}

  async ngOnInit() {
    const helperArray = await firstValueFrom(
      this.collectionService
        .getCollectionByCollectionAndDoc('Categories', 'all')
        .pipe(take(1))
    );

    this.categoryArray = ['Összes', 'Saját'].concat(
      (helperArray as any)['Array']
    );

    const forumArray = await this.getCollectionKeys('Forums');
    for (const forum of Array.from((forumArray as any)['docs'])) {
      const id = (forum as any)['id'];
      const actualForum = await firstValueFrom(
        this.collectionService
          .getCollectionByCollectionAndDoc('Forums', id)
          .pipe(take(1))
      );
      this.forumObjectArray.push(actualForum as forum);
    }
    this.chosenForumObjectArray = [...this.forumObjectArray];
    this.loaded = true;
  }

  ngOnDestroy(): void {}

  filter(keyWord: string) {
    this.loaded = false;

    if (this.actualCategory === keyWord) {
      this.loaded = true;
      return;
    }
    this.actualCategory = keyWord;
    if (keyWord === 'Összes') {
      this.chosenForumObjectArray = [...this.forumObjectArray];
    } else {
      this.arrayFilter(keyWord);
    }
    this.loaded = true;
  }

  arrayFilter(keyWord: string) {
    const userId = localStorage.getItem('userId');
    this.chosenForumObjectArray = [];
    this.forumObjectArray.forEach((forum) => {
      if (
        forum[keyWord === 'Saját' ? 'userId' : 'category'] ===
        (keyWord === 'Saját' ? userId : keyWord)
      ) {
        this.chosenForumObjectArray.push(forum);
      }
    });
  }

  async getCollectionKeys(collectionName: string) {
    const helperArray = await firstValueFrom(
      this.collectionService
        .getAllDocByCollectionName(collectionName)
        .pipe(take(1))
    );
    return helperArray;
  }

  /*
  ngOnInit(): void {
    this.collectionSub = this.collectionService
      .getCollectionByCollectionAndDoc('Categories', 'all')
      .subscribe((data) => {
        if (data) {
          this.categoryArray = ['Összes', 'Saját'];
          this.categoryArray = this.categoryArray.concat(
            Object.values(data)[0]
          );
          this.collectionSub!.unsubscribe();
        }
      });

    this.forumKeysSub = this.collectionService
      .getAllDocByCollectionName('Forums')
      .subscribe((data: any) => {
        const allInfoFromDatabaseCollection: any[] = Object.values(data);
        for (const iterator of allInfoFromDatabaseCollection) {
          if (iterator['docs']) {
            for (const iterator2 of iterator['docs']) {
              this.keyArray.push(iterator2['id']);
            }
          }
        }
        if (this.keyArray.length) {
          for (const iterator of this.keyArray) {
            const forumsSub: Subscription = this.collectionService
              .getCollectionByCollectionAndDoc('Forums', iterator)
              .subscribe((data) => {
                console.log(iterator);
                this.forumObjectArray.push(data as forum);
                this.loaded = true;
                forumsSub.unsubscribe();
              });
          }
        } else {
          this.loaded = true;
        }
        //this.forumKeysSub!.unsubscribe();
      });
  }

  filter(filterKeyWord:string){
    console.log(filterKeyWord)
  }


  ngOnDestroy(): void {
    this.collectionSub?.unsubscribe();
    this.forumKeysSub?.unsubscribe();
  }

  */
}
