import {
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { formAnimations } from '../../../shared/animations/forms.animations';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  animations: [
    trigger('signupAnimation',[
      transition(':enter',[
        useAnimation(formAnimations)
      ])
    ])
  ]
})
export class SignUpComponent {}
