import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { formAnimations } from '../../../shared/animations/forms.animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';
import { user } from '../../../shared/interfaces/user';
import { Subscription } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { PopupService } from '../../../shared/services/popup.service';
import { Dialog } from '../../../shared/interfaces/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: { 'style._theme': 'getColor()' },
  animations: [
    trigger('loginAnimation', [
      transition(':enter', [useAnimation(formAnimations)]),
    ]),
  ],
})
export class LoginComponent implements OnDestroy {
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  private popupDialogTemplate: Dialog;
  private userValuesChangesService?: Subscription;

  constructor(
    private userService: UserService,
    private navigationService: NavigateAndurlinfoService,
    private popupSercice: PopupService
  ) {
    this.popupDialogTemplate = this.popupSercice.getTemplateDialog();
    this.popupDialogTemplate.hostComponent = 'LoginComponent';
  }

  ngOnDestroy(): void {
    this.userValuesChangesService?.unsubscribe();
  }

  login() {
    if (this.loginForm.valid) {
      this.userService
        .login(
          this.loginForm.get('email')!.value!,
          this.loginForm.get('password')!.value!
        )
        .then((userVarible) => {
          let actualUser: user;
          this.userValuesChangesService = this.userService
            .getUserInfoByUserId(userVarible.user.uid)
            .subscribe((data) => {
              actualUser = data as user;
              actualUser.lastLogin = Timestamp.now();
              this.userService
                .updateUser(actualUser)
                .then(() => {
                  localStorage.setItem('userId', actualUser.id);
                  this.navigationService.navigate(true, 'main');
                })
                .catch((err) => {
                  console.error(err);
                  this.popupDialogTemplate.content =
                    'Hiba történt a bejelentkezési folyamat során. Próbáld újra';
                  this.popupDialogTemplate.title = 'hiba!';
                });
            });
        })
        .catch((err) => {
          console.error(err);
          this.popupDialogTemplate.content =
            'Valószinüleg hibás az email vagy a jelszó';
          this.popupDialogTemplate.title = 'hiba!';
          this.popupSercice.displayPopUp(this.popupDialogTemplate);
        });
    }
  }
}
