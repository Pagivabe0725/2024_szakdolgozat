import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { user } from '../../../../../shared/interfaces/user';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent {
  @Input() public darkmode!: boolean;
  @Input() public actualUser!: user;
  @Output() public deleteEvent: EventEmitter<string> = new EventEmitter();
}
