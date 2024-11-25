import { Component } from '@angular/core';
import { WorkMessageComponent } from './work-message/work-message.component';
import { WorkMessageCommentComponent } from './work-message-comment/work-message-comment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [WorkMessageComponent, WorkMessageCommentComponent, CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  isDarkmode(): boolean {
    return localStorage.getItem('theme')!.includes('dark');
  }
}
