import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RouterPlusService } from '../../../../shared/services/router-plus.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { Subscription, firstValueFrom, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../../services/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-left-side-controller',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './left-side-controller.component.html',
  styleUrl: './left-side-controller.component.scss',
})
export class LeftSideControllerComponent {
  @Input() public endPoint!: string;
  @Output() public buttonAction: EventEmitter<string> = new EventEmitter();
  @Input () public workInfoArray?: Array<Array<string>> ;
  private infoSub?: Subscription;
  constructor(
    private navigateService: NavigateAndurlinfoService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private matSnackBar: MatSnackBar
  ) {}




  isDarkmode(): boolean {
    const theme = localStorage.getItem('theme');
    return theme ? theme.includes('dark') : false;
  }

  back(): void {
   this.buttonAction.emit('all')
  }

  butonNavigate(page:string):void{
    this.buttonAction.emit(page)
  }

  copy(text: string):void {
    navigator.clipboard.writeText(text);
    this.matSnackBar.open(`${text} kimásolva`, 'Bezár', {
      duration: 3000,
      announcementMessage: text,
    });
  }




  deleteWorkPage():void{

    this.navigateService.basicNavigate('private/delete-work')
  }

}
