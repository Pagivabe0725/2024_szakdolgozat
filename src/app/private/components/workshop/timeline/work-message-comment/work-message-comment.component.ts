import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work-message-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-message-comment.component.html',
  styleUrl: './work-message-comment.component.scss',
})
export class WorkMessageCommentComponent {
  @Input() public darkmode!: boolean;
  public actualCommentContent: string = '';
}
