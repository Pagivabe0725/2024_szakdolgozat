import { Component, OnInit } from '@angular/core';
import { LeftsideConsoleComponent } from './leftside-console/leftside-console.component';
import { CardElementComponent } from './card-element/card-element.component';
import { forum } from '../../../shared/interfaces/forum';
import { MatButtonModule } from '@angular/material/button';

import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeInAnimations } from '../../../shared/animations/fadeIn.animation';
import { CollectionService } from '../../../shared/services/collection.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    LeftsideConsoleComponent,
    CardElementComponent,
    MatButtonModule,
    SpinnerComponent,
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss',
  animations: [
    trigger('forumElementsAnimation', [
      transition('* <=> *', [useAnimation(fadeInAnimations)], {}),
    ]),
  ],
})
export class ForumComponent implements OnInit {
  public forumObjectArray: forum[] = [];
  public categoryArray: string[] = [];
  public loaded = false;
  private keyArray: string[] = [];

  constructor(private collectionService: CollectionService) {}
  ngOnInit(): void {
    const collectionSub: Subscription = this.collectionService
      .getCollectionByCollectionAndDoc('Categories', 'all')
      .subscribe((data) => {
        if (data) {
          this.categoryArray = ['Összes', 'Saját'];
          this.categoryArray = this.categoryArray.concat(
            Object.values(data)[0]
          );
          collectionSub.unsubscribe();
        }
      });

    const forumKeysSub: Subscription = this.collectionService
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
        forumKeysSub.unsubscribe();
      });
  }
}
