import { Component, OnInit } from '@angular/core';
import { WorkcardComponent } from '../workcard/workcard.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { work } from '../../../../shared/interfaces/work';
import { Subscription, filter, firstValueFrom, take } from 'rxjs';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [WorkcardComponent, SpinnerComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent implements OnInit {
  protected worksArray: Array<work> = [];
  protected chosenWorksArray: Array<work> = [];
  public loaded = false;
  constructor(
    private collectionService: CollectionService,
    private navigateAndURLInfoService: NavigateAndurlinfoService,
    private sharedDataService: SharedDataService,
  ) {}

  async ngOnInit() {
    const endpoint = this.navigateAndURLInfoService.endpoint();
    const allWork = await this.getAllWorks();
    (await endpoint) === 'all'
      ? this.addAllWorkToArray(allWork)
      : this.addAllOwnWorkToArray(allWork);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.chosenWorksArray = [...this.worksArray];
    this.loaded = true;
    this.sharedDataService.changeData(this.chosenWorksArray)
  }

  getAllWorks(): Promise<unknown> {
    return firstValueFrom(
      this.collectionService.getAllDocByCollectionName('Works').pipe(take(1))
    );
  }

  addAllWorkToArray(data: any): Promise<void> {
    const userId = localStorage.getItem('userId');
    return (data as any).forEach((e: any) => {
      this.collectionService
        .getCollectionByCollectionAndDoc('Works', (e as any)['id'])
        .pipe(
          take(1),
          filter(
            (filtered) =>
              (filtered as work).userId === userId ||
              (filtered as work).members.includes(userId!)
          )
        )
        .subscribe((element) => {
          this.worksArray.push(element as work);
        });
    });
  }

  addAllOwnWorkToArray(data: any): Promise<void> {
    const userId = localStorage.getItem('userId');
    return (data as any).forEach((e: any) => {
      this.collectionService
        .getCollectionByCollectionAndDoc('Works', (e as any)['id'])
        .pipe(
          take(1),
          filter((filtered) => (filtered as work).userId === userId)
        )
        .subscribe((element) => {
          this.worksArray.push(element as work);
        });
    });
  }
}
