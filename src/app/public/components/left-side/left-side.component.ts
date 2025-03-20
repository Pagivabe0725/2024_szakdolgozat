import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterPlusService } from '../../../shared/services/router-plus.service';

@Component({
  selector: 'app-left-side',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.scss',
})
export class LeftSideComponent implements OnInit {
  public page = 'login';

  constructor(private routerPlus: RouterPlusService) {}

  ngOnInit(): void {
    this.page= this.routerPlus.getURLEndPoint() ==='login' ? 'login' :  'registration'
  }

  navigate(): void {
    this.page = this.page === 'login' ? 'registration' : 'login';
    this.routerPlus.navigateToNewPage(this.page);
  }
}
