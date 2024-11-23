import { Component } from '@angular/core';
import { WorkcardComponent } from '../workcard/workcard.component';

@Component({
  selector: 'app-left-side-controller',
  standalone: true,
  imports: [WorkcardComponent],
  templateUrl: './left-side-controller.component.html',
  styleUrl: './left-side-controller.component.scss',
})
export class LeftSideControllerComponent {
  
}
