import {
  animate,
  group,
  keyframes,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { formAnimations } from '../../../shared/animations/forms.animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: { 'style._theme': 'getColor()' },
  animations: [
    trigger('loginAnimation', [
      transition(':enter', [useAnimation(formAnimations)]),
    ]),
  ],
})
export class LoginComponent {
  constructor() {}
}
