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
export class LeftSideControllerComponent implements OnInit, OnDestroy {
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
  private routerSubscription!: Subscription;

  ngOnInit(): void {
    console.log('this.workInfoArray')
    console.log(this.workInfoArray)
  }

  ngOnDestroy(): void {}

  switchWorklist(): void {}

  isDarkmode(): boolean {
    const theme = localStorage.getItem('theme');
    return theme ? theme.includes('dark') : false;
  }

  back(): void {
   this.buttonAction.emit('all')
  }

  butonNavigate(page:string):void{

    this.buttonAction.emit(page)
    console.log(page)
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
    this.matSnackBar.open(`${text} kimásolva`, 'Bezár', {
      duration: 3000,
      announcementMessage: text,
    });
  }

  /*

  async ngOnInit() {

    
    const session = sessionStorage.getItem('actualWorks');

    if (!session) {
      const result = await firstValueFrom(
        this.sharedDataService.actualUsersWorkInfoArray.pipe(take(1))
      );
      this.workInfoArray = Array.isArray(result) ? result : [];
    } else {
      this.workInfoArray = JSON.parse(
        sessionStorage.getItem('actualWorks')!
      ) as Array<Array<string>>;
    }

    this.endPoint = this.navigateService.endpoint();
    sessionStorage.setItem('actualWorks', JSON.stringify(this.workInfoArray));
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const endPoint = event.urlAfterRedirects.split('/').pop() || 'works';
        this.endPoint = endPoint;
      }
    });

    console.log(this.workInfoArray);

    
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    sessionStorage.removeItem('left-side-controler');
    sessionStorage.removeItem('actualWorks');
  }

  back(): void {
    const actualURLEndpoin: string = this.navigateService.endpoint();
    if (actualURLEndpoin === 'all' || actualURLEndpoin === 'my') {
      this.navigateService.navigate(true, 'main');
    } else {
      this.navigateService.navigate(true, 'workshop');
    }
  }

  createNavigation(): void {
    this.navigateService.basicNavigate('private/workshop/workcreator');
  }

  createMessage(): void {
    this.navigateService.basicNavigate(`private/message/${this.endPoint}`);
  }

  createMessageComment(): void {
    this.navigateService.basicNavigate(
      `private/message-comment/${this.endPoint}`
    );
  }

  switchWorklist(): void {
    if (this.endPoint === 'all') {
      this.navigateService.basicNavigate('private/workshop/works/my');
    } else {
      this.navigateService.basicNavigate('private/workshop/works/all');
    }
  }

  isDarkmode(): boolean {
    const theme = localStorage.getItem('theme');
    return theme ? theme.includes('dark') : false;
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
    this.matSnackBar.open(`${text} kimásolva`, 'Bezár', {
      duration: 3000,
      announcementMessage: text,
    });
  }

  */
}
