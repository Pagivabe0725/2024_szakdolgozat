import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { formAnimations } from '../../../shared/animations/forms.animations';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { PopupService } from '../../../shared/services/popup.service';
import { Dialog } from '../../../shared/interfaces/dialog';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  animations: [
    trigger('signupAnimation', [
      transition(':enter', [useAnimation(formAnimations)]),
    ]),
  ],
})
export class SignUpComponent {
  protected signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telNum: new FormControl('', [Validators.required]),
    city: new FormControl('', []),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private userService: UserService,
    private popupService: PopupService
  ) {}

  isValidForm(): { valid: boolean; passwords: boolean } {
    return {
      valid: this.signupForm.valid,
      passwords:
        this.signupForm.get('password')?.value ===
        this.signupForm.get('rePassword')?.value,
    };
  }

  check() {
    this.popupService.displayPopUp({
      width: '70%',
      height: '70%',
      hostComponent: 'SignupComponent',
      title: 'Nem megegyező jelszavak!',
      content: 'Nézd át a két jelszó mezőt, mert nem egyeznek meg',
      action: false,
    } as Dialog);
    console.log('bent');
    const actualStatus: { valid: boolean; passwords: boolean } =
      this.isValidForm();
/*    if (actualStatus.valid && !actualStatus.passwords) {
      this.popupService.displayPopUp({
        width: '70%',
        height: '70%',
        hostComponent: 'SignupComponent',
        title: 'Nem megegyező jelszavak!',
        content: 'Nézd át a két jelszó mezőt, mert nem egyeznek meg',
        action: false,
      } as Dialog);
    }*/
  }
}
