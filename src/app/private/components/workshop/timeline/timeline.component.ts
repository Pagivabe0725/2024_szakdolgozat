import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkMessageComponent } from './work-message/work-message.component';
import { WorkMessageCommentComponent } from './work-message-comment/work-message-comment.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { Subscription, firstValueFrom, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { work } from '../../../../shared/interfaces/work';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';


@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    WorkMessageComponent,
    WorkMessageCommentComponent,
    CommonModule,
    SpinnerComponent,
    ControlpanelComponent,
    
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent implements OnInit, OnDestroy {
  protected loaded = false;
  private actualWorkSub?: Subscription;
  protected actualWork!: work;

  constructor(
    private collectionService: CollectionService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.pipe(take(1)).subscribe(async (param) => {
      //console.log(param['workId']);
      const work = await firstValueFrom(
        this.collectionService
          .getCollectionByCollectionAndDoc('Works', param['workId'])
          .pipe(take(1))
      );
      this.actualWork = work as work;
      this.loaded = true;
      console.log(this.actualWork);
    });
  }

  ngOnDestroy(): void {
    if (this.actualWorkSub) {
      this.actualWorkSub.unsubscribe();
    }
  }

  isDarkmode(): boolean {
    return localStorage.getItem('theme')!.includes('dark');
  }
}
