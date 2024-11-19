import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forum-element-info',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './forum-element-info.component.html',
  styleUrl: './forum-element-info.component.scss',
})
export class ForumElementInfoComponent {
  isDarkmode(): boolean {
    return localStorage.getItem('theme')!.includes('dark');
  }
}
