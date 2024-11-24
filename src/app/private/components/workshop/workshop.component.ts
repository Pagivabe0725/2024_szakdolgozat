import { Component } from '@angular/core';
import { LeftSideControllerComponent } from './left-side-controller/left-side-controller.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [LeftSideControllerComponent, RouterOutlet],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss'
})
export class WorkshopComponent {

}
