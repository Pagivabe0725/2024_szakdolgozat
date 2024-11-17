import { animate, animation, query, stagger, style } from '@angular/animations';


export const fadeInAnimations = animation([
  query(
    ':enter',
    [
      style({ opacity: '{{basicOpacity}}', transform: 'scale({{basicScale}})' }),
      stagger(100, [
        animate(
          '{{actualDuration}}',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ],
    { optional: true }
  ),
]);
