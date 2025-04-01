import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { forum } from '../../../../shared/interfaces/forum';
import { CommonModule } from '@angular/common';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';

@Component({
  selector: 'app-card-element',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './card-element.component.html',
  styleUrl: './card-element.component.scss',
})
export class CardElementComponent {
  @Input() public actiualForumMessage!: forum;

  constructor(private navigateService: NavigateAndurlinfoService) {}
  isDarkmode(): boolean {
    const theme = localStorage.getItem('theme');
    return theme ? theme.includes('dark') : false;
  }

  loadForumElement(): void {
    console.log(this.actiualForumMessage.id);
    this.navigateService.navigate(false, this.actiualForumMessage.id);
  }
}
