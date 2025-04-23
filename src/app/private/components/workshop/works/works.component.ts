import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WorkcardComponent } from '../workcard/workcard.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { work } from '../../../../shared/interfaces/work';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { filter, firstValueFrom, take } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

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
  protected loaded = false;
  constructor(
    private navigateAndURLInfoService: NavigateAndurlinfoService,
    private sharedDataService: SharedDataService,
    private collectionService: CollectionService
  ) {}

  async ngOnInit() {
    const query = await this.getAllWorks();
    await this.addElementsToWorkArray(query);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.loaded = true;
  }

  getAllWorks() {
    return firstValueFrom(
      this.collectionService.getAllDocByCollectionName('Works').pipe(take(1))
    );
  }

  addElementsToWorkArray(data: unknown) {
    const array = Array.from((data as any)['docs']);
    const userId = localStorage.getItem('userId');
    array.forEach((e: any) => {
      this.collectionService
        .getCollectionByCollectionAndDoc('Works', e['id'])
        .pipe(
          take(1),
          filter(
            (fil) =>
              (fil as work).userId === userId ||
              (fil as work).author.id === userId
          )
        )
        .subscribe((element) => {
          this.worksArray.push(element as work);
          this.chosenWorksArray.push(element as work);
        });
    });
  }
}
