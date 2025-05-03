import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { work } from '../../../../../shared/interfaces/work';
import { OwnDateFormaterPipe } from '../../../../../shared/pipes/own-date-formater.pipe';

@Component({
  selector: 'app-controlpanel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, OwnDateFormaterPipe],
  templateUrl: './controlpanel.component.html',
  styleUrl: './controlpanel.component.scss',
})
export class ControlpanelComponent implements OnInit {
  @Input() public darkmode?: boolean;
  @Input() public actualWork!: work;
  protected userId = localStorage.getItem('userId');
  ngOnInit(): void {
    console.log(this.darkmode);
  }
}
