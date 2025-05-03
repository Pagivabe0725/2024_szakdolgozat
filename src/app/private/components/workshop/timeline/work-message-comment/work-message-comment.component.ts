import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { work } from '../../../../../shared/interfaces/work';

@Component({
  selector: 'app-work-message-comment',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './work-message-comment.component.html',
  styleUrl: './work-message-comment.component.scss',
})
export class WorkMessageCommentComponent {
  @Input() public darkmode!: boolean;
  @Input() public actualWork!:work
  public actualCommentContent: string = '';
}
