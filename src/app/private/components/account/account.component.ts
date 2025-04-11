import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from '../../../shared/services/user.service';
import { user } from '../../../shared/interfaces/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private _actualUser!: user;
  public keyTransleater: { [key: string]: string } = {
    firstName: 'Keresztnév',
    lastName: 'Vezetéknév',
    email: 'Email-címem:',
    telNumber: 'Telefonszámom',
    lastLogin: 'Utolsó bejelentkezésem',
    city: 'Városom',
    dateOfRegistration: 'Regisztráltam',
  };
  public keyArray: Array<keyof user> = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUserInfoByUserId(localStorage.getItem('userId')!)
      .pipe(take(1))
      .subscribe((user) => {
        this._actualUser = user as user;
      this.keyArray=Object.keys(this.actualUser) as Array<keyof user>;
      });
  }

  isDarkmode(): boolean {
    const theme = localStorage.getItem('theme');
    return theme ? theme.includes('dark') : false;
  }

  get actualUser(){
    return this._actualUser
  }
}
