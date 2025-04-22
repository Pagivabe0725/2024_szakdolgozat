import { Component, OnInit } from '@angular/core';
import { LeftSideControllerComponent } from './left-side-controller/left-side-controller.component';
import { RouterOutlet } from '@angular/router';
import { CollectionService } from '../../../shared/services/collection.service';
import { SharedDataService } from '../../services/shared-data.service';
import { work } from '../../../shared/interfaces/work';
import { filter, firstValueFrom, take } from 'rxjs';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [LeftSideControllerComponent, RouterOutlet, SpinnerComponent],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss',
})
export class WorkshopComponent implements OnInit {
  private workArray: Array<work> = [];
  protected loaded= false;
  constructor(
    private collectionService: CollectionService,
    private sharedDataService: SharedDataService
  ) {}

  async ngOnInit() {
    const allWork = await this.getAllWorks();
    await this.addAllWorkToArray(allWork);
    this.sharedDataService.setActualUserWorkArray(this.workArray);
    this.loaded=true
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
          this.workArray.push(element as work);
        });
    });
  }
}
