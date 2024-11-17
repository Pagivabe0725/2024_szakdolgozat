import { animate, animation, query, stagger, style } from '@angular/animations';

export const turnUpAnimation = animation([
  query(
    ':enter',
    [
      style({ opacity: 0, transform: 'scale(0.7)' }),
      stagger(100, [
        animate(
          '{{actualDuration}}',
          style({ opacity: 0.7, transform: 'scale(1)' })
        ),
      ]),
    ],
    { optional: true }
  ),
  query(
    ':leave',
    [
      style({ opacity: 0.7, transform: 'scale(1)' }),
      stagger(-50, [
        animate('1s ease-in', style({ opacity: 0, transform: 'scale(0.7)' })),
      ]),
    ],
    { optional: true }
  ),
]);
