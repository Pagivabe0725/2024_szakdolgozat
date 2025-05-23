import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  animations: [
    trigger('slideInOut', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      state(
        'closed',
        style({
          width: '0',
          opacity: 0,
          transform: 'translateX(-100%)',
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit, OnDestroy {
  private routerSub?: Subscription
  @Input() isOpen = false;
  @Input() mode!: 'dark' | 'light';
  @Output() themeEvent: EventEmitter<string> = new EventEmitter();
  @Output() modeEvent: EventEmitter<void> = new EventEmitter();
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter();
  @Input() width! : number 
  @Input() height! : number 

  constructor(
    private navigateAndURLInfoService: NavigateAndurlinfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerSub=this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (this.isOpen) {
          this.closeEvent.emit();
        }
      });
  }

  ngOnDestroy(): void {
    if(this.routerSub){
      this.routerSub.unsubscribe()
    }
  }

  isDarkmode(): boolean {
    return this.mode === 'dark' ? true : false;
  }

  navigate(navigate: string): void {
    this.navigateAndURLInfoService.basicNavigate(`private/${navigate}`);
  
  }
}
