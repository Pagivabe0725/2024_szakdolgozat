import { Component } from '@angular/core';
import { WorkcardComponent } from '../workcard/workcard.component';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [WorkcardComponent],
  templateUrl: './works.component.html',
  styleUrl: './works.component.scss',
})
export class WorksComponent {
  protected myWorksArray: Array<string> = [
    'a',
    'c',
    'b',
    'a',
    'c',
    'b',
    'a',
    'c',
    'b',
    'a',
    'c',
    'b',
  ];
}
