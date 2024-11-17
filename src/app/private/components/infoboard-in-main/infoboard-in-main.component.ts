import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { infoboxInMain_component } from '../../../shared/interfaces/info_board';

@Component({
  selector: 'app-infoboard-in-main',
  standalone: true,
  imports: [CommonModule, MatIcon, MatCardModule],
  templateUrl: './infoboard-in-main.component.html',
  styleUrl: './infoboard-in-main.component.scss',
  animations: [
    trigger('infoElementAnimation', [
      state(
        'open',
        style({
          height: '70vh',
          width: '90%',
          'border-radius': '5em',
          opacity: 1,
        })
      ),
      state('close', style({ height: '20vh' })),
      transition('close <=> open', [animate('0.3s ease-in')]),
    ]),

    trigger('infoAnimations', [
      transition(':enter', [
        style({ opacity: 0.1 }),
        animate('0.2s ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class InfoboardInMainComponent {
  @HostListener('mouseover') onMouseOver() {
    this.animation.set('open');
    this.animationFinished = true;
    setTimeout(() => {
      if (this.animationFinished) {
        this.collectionDisplay = true;
      }
    }, 100);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.animation.set('close');

    this.animationFinished = false;
    this.collectionDisplay = false;
  }
  protected animation: WritableSignal<'open' | 'close'> = signal('close');
  protected animationFinished: boolean = false;
  protected collectionDisplay: boolean = false;
  @Input() actualInfoBoard!: infoboxInMain_component;

  getTheme(): boolean {
    return localStorage.getItem('theme')!.includes('dark');
  }
}
