import { animate, animation, group, style } from '@angular/animations';

const duration: string = `${0.5}s ease-in`;

export const formAnimations = animation([
  style({
    transform: 'translatex(-120%) rotate(10deg)',
    scale: 0.3,
    opacity: 0.3,
    'border-radius': '0',
    'z-index': -999,
  }),

  group([
    animate(duration, style({ transform: 'translatex(0)', scale: 1 })),
    animate(duration, style({ opacity: 1 })),
  ]),

  animate('0.2s ease-in', style({ 'border-radius': '5em' })),
]);


