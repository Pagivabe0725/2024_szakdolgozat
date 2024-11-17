import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { forum } from '../../../../shared/interfaces/forum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-element',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './card-element.component.html',
  styleUrl: './card-element.component.scss',
})
export class CardElementComponent {
  @Input() public actiualForumMessage!: forum ;
  
  isDarkmode():boolean{
    return localStorage.getItem('theme')!.includes('dark')
  }
}
