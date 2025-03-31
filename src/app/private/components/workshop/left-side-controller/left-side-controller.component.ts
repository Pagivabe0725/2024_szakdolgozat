import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RouterPlusService } from '../../../../shared/services/router-plus.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-left-side-controller',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './left-side-controller.component.html',
  styleUrl: './left-side-controller.component.scss',
})
export class LeftSideControllerComponent implements OnInit, OnDestroy {
  public direction!: string;
  private endPoint!: string;
  constructor(
    private navigateService: NavigateAndurlinfoService,
    private router: Router
  ) {}
  private routerSubscription!: Subscription;

  ngOnInit(): void {
    this.direction = sessionStorage.getItem('left-side-controler') || 'basic';
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const endPoint = event.urlAfterRedirects.split('/').pop() || 'works';
        this.direction = endPoint === 'works' ? 'basic' : 'specific';
        sessionStorage.setItem('left-side-controler', this.direction);
        this.endPoint = endPoint;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    sessionStorage.removeItem('left-side-controler');
  }

  back(): void {
    const actualURLEndpoin: string = this.navigateService.endpoint();
    if (actualURLEndpoin === 'works') {
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
    this.navigateService.basicNavigate(`private/message-comment/${this.endPoint}`);
  }
  
  
}
