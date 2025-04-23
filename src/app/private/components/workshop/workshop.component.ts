import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeftSideControllerComponent } from './left-side-controller/left-side-controller.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CollectionService } from '../../../shared/services/collection.service';
import { SharedDataService } from '../../services/shared-data.service';
import { work } from '../../../shared/interfaces/work';
import { Subscription, filter, firstValueFrom, take } from 'rxjs';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [LeftSideControllerComponent, RouterOutlet, SpinnerComponent],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss',
})
export class WorkshopComponent {
  constructor() {}
}
