import {
  animate,
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
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-infoboard-in-main',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './infoboard-in-main.component.html',
  styleUrl: './infoboard-in-main.component.scss',
  animations: [
    trigger('infoElementAnimation', [
      state('open', style({ height: '70vh' , width:'90%' })),
      state('close', style({ height: '20vh' })),
      transition('close <=> open', [animate('0.3s ease-in')]),
    ]),
  ],
})
export class InfoboardInMainComponent {
  @HostListener('mouseover') onMouseOver() {
    console.log('o');
    this.animation.set('open');
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('c');
    this.animation.set('close');
  }

  protected animation: WritableSignal<'open' | 'close'> = signal('close');
  protected a ='80vh'
  @Input() color: 'primary' | 'accent' | 'highlight' | 'none' = 'none';
}
