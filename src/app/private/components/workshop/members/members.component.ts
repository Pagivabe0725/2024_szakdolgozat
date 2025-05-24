import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { work } from '../../../../shared/interfaces/work';
import { CollectionService } from '../../../../shared/services/collection.service';
import { user } from '../../../../shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from './member-card/member-card.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupService } from '../../../../shared/services/popup.service';
import { Dialog } from '../../../../shared/interfaces/dialog';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    CommonModule,
    MemberCardComponent,
    SpinnerComponent,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements OnInit {
  protected actualWork!: work;
  protected allUser: Map<string, user> = new Map();
  protected loaded = false;

  protected email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(
    private actRoute: ActivatedRoute,
    private collectionService: CollectionService,
    private navigateAndURLInfoService: NavigateAndurlinfoService,
    private snackbar: MatSnackBar,
    private popUpService: PopupService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.pipe(take(1)).subscribe(async (r) => {
      this.actualWork = (await this.getWork(r['workId']!)) as work;
      const allUsers = (await this.getAllUsers()) as any;

      for (const user of allUsers['docs']) {
        const id = (user as any)['id'];
        this.allUser.set(id, (await this.getUserById(id)) as user);
      }
      this.loaded = true;
    });
  }

  isDarkmode(): boolean {
    return localStorage.getItem('theme')!.includes('dark');
  }

  getWork(id: string): Promise<unknown> {
    return firstValueFrom(
      this.collectionService
        .getCollectionByCollectionAndDoc('Works', id)
        .pipe(take(1))
    );
  }

  getAllUsers(): Promise<unknown> {
    return firstValueFrom(
      this.collectionService.getAllDocByCollectionName('Users').pipe(take(1))
    );
  }

  getUserById(id: string): Promise<unknown> {
    return firstValueFrom(
      this.collectionService
        .getCollectionByCollectionAndDoc('Users', id)
        .pipe(take(1))
    );
  }

  back(): void {
    this.navigateAndURLInfoService.basicNavigate(
      `private/workshop/${this.actualWork.id}`
    );
  }

  createSnackbar(text: string) {
    navigator.clipboard.writeText(text);
    this.snackbar.open(text, 'Bezár', {
      duration: 3000,
      announcementMessage: text,
      panelClass: [],
      verticalPosition: 'bottom', //
    });
  }

  doesEmailExist(): boolean {
    let inside = false;
    for (const user of this.allUser.values()) {
      if (user.email === this.email.value) {
        inside = true;
        break;
      }
    }
    return inside;
  }

  isTeamMemberEmail(email: string): boolean {
    let inside = false;
    for (const id of this.actualWork.members) {
      if (this.allUser.get(id)?.email === email) {
        inside = true;
        break;
      }
    }
    return inside;
  }

  check(): void {
    if (this.email.valid) {
      if (this.isTeamMemberEmail((this.email.value as string).trim())) {
        this.createSnackbar('Ő már a csapat tagja');
      } else if (!this.doesEmailExist()) {
        this.createSnackbar('Nem létezik ilyen email-cím');
      } else {
        this.updateWork();
      }
    }
  }

  getUserByEmail(email: string): { [key: string]: user } {
    let newUser: { [key: string]: user } = {};
    for (const user of this.allUser.values()) {
      if (user.email === email) {
        newUser = { [user.id]: user };
      }
    }
    return newUser;
  }

  async updateWork(): Promise<void> {
    const user = this.getUserByEmail(this.email.value);
    this.actualWork.members.push(Object.keys(user)[0])
   await this.collectionService.updateDatas('Works',this.actualWork.id,this.actualWork)
   this.createSnackbar('Sikeres tagfelvétel')
  }

  deleteMember(id: string): void {
    const dialog: Dialog = {
      ...this.popUpService.getTemplateDialog(),
      hostComponent: 'MembersComponent',
      title: 'Biztosan törli?',
      content: 'Biztosan törölni szeretnéd a résztvevőt?',
      action: true,
    };

    this.popUpService
      .displayPopUp(dialog)
      .afterClosed()
      .pipe(take(1))
      .subscribe(async (r) => {
        if (r) {
          this.actualWork.members.splice(
            this.actualWork.members.indexOf(id),
            1
          );

          await this.collectionService.updateDatas(
            'Works',
            this.actualWork.id,
            this.actualWork
          );
          this.createSnackbar('Sikeres törlés');
        }
      });
  }
}
