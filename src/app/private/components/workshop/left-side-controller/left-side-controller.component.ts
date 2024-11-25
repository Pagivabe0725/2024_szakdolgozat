import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterPlusService } from '../../../../shared/services/router-plus.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-left-side-controller',
  standalone: true,
  imports: [MatButtonModule,MatIconModule],
  templateUrl: './left-side-controller.component.html',
  styleUrl: './left-side-controller.component.scss',
})
export class LeftSideControllerComponent implements OnInit {
  private actualEndPoint: string = '';

  constructor(private routerService: RouterPlusService) {}

  ngOnInit(): void {
    this.actualEndPoint = this.routerService.getURLEndPoint();
    console.error(this.actualEndPoint);
  }

  getDirection():'basic'|'work'{
    return this.actualEndPoint==='works'? 'basic' : 'work'
  }
}
