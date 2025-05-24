import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WorkcardComponent } from '../workcard/workcard.component';
import { CollectionService } from '../../../../shared/services/collection.service';
import { work } from '../../../../shared/interfaces/work';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [WorkcardComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent implements OnInit, OnDestroy {
  @Input() public worksArray: Array<work> = [];
  protected chosenWorksArray: Array<work> = [];

  constructor() {}

  ngOnInit(): void {
    this.chosenWorksArray = [...this.worksArray];
  }

  ngOnDestroy(): void {}

}
