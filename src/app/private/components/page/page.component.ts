import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InfoboardInMainComponent } from '../infoboard-in-main/infoboard-in-main.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule,InfoboardInMainComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  @Input() columns: number = 2;
  @Input() color: 'primary' | 'accent' | 'highlight' | 'none' = 'none';
}
