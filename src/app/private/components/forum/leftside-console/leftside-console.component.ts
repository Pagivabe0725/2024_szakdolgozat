import {
  animate,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, Input, WritableSignal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { turnUpAnimation } from '../../../../shared/animations/usefullAnimations';
import { MatButtonModule } from '@angular/material/button';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';

@Component({
  selector: 'app-leftside-console',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatIconModule],
  templateUrl: './leftside-console.component.html',
  styleUrl: './leftside-console.component.scss',
  animations: [
    trigger('leftside-console_Animation', [
      transition(':enter', [
        style({ transform: 'translateX(-10vw)' }),
        animate('0.3s ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      state(
        'open',
        style({
          width: '30vw',
          height: '82vh',
          'border-radius': '0 1vw 1vw 0',
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          width: '10vw:',
          height: '10vh',
          'border-radius': '0 5vw 5vw 0',
          opacity: 0.7,
        })
      ),
      transition('close <=> open', [animate('1s ease-in')]),
    ]),
    trigger('elementAnimations', [
      transition('* <=> *', [useAnimation(turnUpAnimation)], {
        params: {
          actualDuration: '0.5s ease-in',
        },
      }),
    ]),
  ],
})
export class LeftsideConsoleComponent  {
  protected state: WritableSignal<'open' | 'close'> = signal('close');
  protected listVisible = false;
  @Input() public categoryTitleArray!: string[];

  constructor(private navigateService: NavigateAndurlinfoService) {}

  

  changeMenu(): void {
    const helperArray = [...this.categoryTitleArray];
    if (this.state() === 'close') {
      this.state.set('open');
      setTimeout(() => {
        this.listVisible = true;
        this.categoryTitleArray = [];
        this.categoryTitleArray = [...helperArray];
      }, 100);
    } else {
      this.categoryTitleArray = [];
      setTimeout(() => {
        this.listVisible = false;
        this.categoryTitleArray = [...helperArray];
      }, 500);
      this.state.set('close');
    }
  }

  addButtonAction(): void {
    console.log('HALIKA');
    this.navigateService.navigate(true, 'addForum');
  }
}
