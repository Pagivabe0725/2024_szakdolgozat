import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
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
import { user } from '../../../shared/interfaces/user';
import { Timestamp } from '@angular/fire/firestore';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  animations: [
    trigger('signupAnimation', [
      transition(':enter', [useAnimation(formAnimations)]),
    ]),
  ],
})
export class SignUpComponent implements OnInit {
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

  private popupDialogTemplate: Dialog;
  public loaded: boolean = false;
  constructor(
    private userService: UserService,
    private popupService: PopupService,
    private navigationService: NavigateAndurlinfoService
  ) {
    this.popupDialogTemplate = popupService.getTemplateDialog();
    this.popupDialogTemplate.hostComponent = 'SignupComponent';
  }

  ngOnInit(): void {
    this.loaded = true;
  }

  isValidForm(): { valid: boolean; passwords: boolean } {
    return {
      valid: this.signupForm.valid,
      passwords:
        this.signupForm.get('password')?.value ===
        this.signupForm.get('rePassword')?.value,
    };
  }

  check() {
    const actualStatus: { valid: boolean; passwords: boolean } =
      this.isValidForm();
    if (actualStatus.valid && !actualStatus.passwords) {
      this.popupDialogTemplate.title = 'Nem megegyező jelszavak!';
      this.popupDialogTemplate.content =
        'Nézd át a két jelszó mezőt, mert nem egyeznek meg';
      this.popupService.displayPopUp(this.popupDialogTemplate);
    } else if (actualStatus.passwords && actualStatus.valid) {
      this.registration(this.createUserObject());
    }
  }

  registration(user: user): void {
    this.loaded = false;
    const emailAndPassword: { email: string; password: string } = {
      email: user.email,
      password: this.signupForm.get('password')?.value!,
    };
    this.userService
      .userRegistration(emailAndPassword.email, emailAndPassword.password)
      .then((userVarible) => {
        user.id = userVarible.user!.uid;
        localStorage.setItem('userId', user.id);
        this.userService
          .createNewUser(user)
          .then(() => {
            this.userService
              .login(emailAndPassword.email, emailAndPassword.password)
              .then(() => {
                this.navigationService.navigate(true, 'main');
              })
              .catch((err) => {
                this.loaded = true;
                console.error(err);
              });
          })
          .catch((err) => {
            this.loaded = true;
            console.error(err);
          });
      })
      .catch((error) => {
        this.loaded = true;
        this.popupDialogTemplate.content =
          'Hiba történt a regisztráció során! Kérlek próbáld újra';
        this.popupDialogTemplate.title = 'hiba!';
        this.popupService.displayPopUp(this.popupDialogTemplate);
        console.error(error);
      });
  }

  createUserObject(): user {
    return {
      id: 'temporary id',
      lastName: this.signupForm.get('lastName')?.value,
      firstName: this.signupForm.get('firstName')?.value,
      email: this.signupForm.get('email')?.value,
      telNumber: this.signupForm.get('telNum')?.value,
      city: this.signupForm.get('city')?.value,
      lastLogin: Timestamp.now(),
      dateOfRegistration: Timestamp.now(),
    } as user;
  }
}
