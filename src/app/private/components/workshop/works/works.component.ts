import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WorkcardComponent } from '../workcard/workcard.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { work } from '../../../../shared/interfaces/work';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { firstValueFrom, take } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [WorkcardComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent implements OnInit, OnDestroy {
  protected worksArray: Array<work> = [];
  protected chosenWorksArray: Array<work> = [];

  constructor(
    private navigateAndURLInfoService: NavigateAndurlinfoService,
    private sharedDataService: SharedDataService
  ) {}

  async ngOnInit() {
    if (sessionStorage.getItem('actualWorks')) {
      this.worksArray = JSON.parse(
        sessionStorage.getItem('actualWorks')!
      ) as Array<work>;

      this.worksArray.forEach((e) => {
        e.created = new Timestamp(e.created.seconds, e.created.nanoseconds);
        e.modified = new Timestamp(e.modified.seconds, e.modified.nanoseconds);
        this.chosenWorksArray.push(e as work);
      });
    } else {
      this.worksArray = (await firstValueFrom(
        this.sharedDataService.actualUsersWorkArray.pipe(take(1))
      )) as Array<work>;
      this.chosenWorksArray = [...this.worksArray];
      sessionStorage.setItem(
        'actualWorks',
        JSON.stringify(this.chosenWorksArray)
      );
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('actualWorks');
  }
}
