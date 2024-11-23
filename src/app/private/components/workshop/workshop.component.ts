import { Component } from '@angular/core';
import { LeftSideControllerComponent } from './left-side-controller/left-side-controller.component';

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [LeftSideControllerComponent],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss'
})
export class WorkshopComponent {

}
