import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-message.component.html',
  styleUrl: './work-message.component.scss',
})
export class WorkMessageComponent {
  @Input() public darkmode!: boolean;
}
