import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InfoboardInMainComponent } from '../infoboard-in-main/infoboard-in-main.component';
import { infoboxInMain_component } from '../../../shared/interfaces/info_board';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule,InfoboardInMainComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  @Input() columns = 2;
  @Input() color!: 'primary' | 'accent' | 'highlight' | 'none' ;
  @Input() actualInfoBoardArray!:infoboxInMain_component[]
}
