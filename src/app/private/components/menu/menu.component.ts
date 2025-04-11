import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  /*
  host: {
    '[$valami]': '[blue]',
  },
  */
})
export class MenuComponent implements OnInit {
  public mode: 'dark' | 'light' = 'light';
  public colorArray: Array<string> = [
    'basic-light',
    'basic-dark',
    'azure-light',
    'azure-dark',
    'magenta-light',
    'magenta-dark',
    'cyan-light',
    'cyan-dark',
  ];
  public actualColor: string = 'basic-light';
  constructor(private navigateAndUrlinfo: NavigateAndurlinfoService) {}

  ngOnInit(): void {
    const actualTheme: string | null = localStorage.getItem('theme');
    if (actualTheme) {
      this.actualColor = actualTheme;
      this.mode = actualTheme.split('-')[1] as 'dark' | 'light';
    }
  }

  changeDarkness(): void {
    this.mode = this.mode === 'dark' ? 'light' : 'dark';
    this.removeAllCollor();
    this.actualColor = this.actualColor.split('-')[0] + '-' + this.mode;
    document.body.classList.add(this.actualColor);
    localStorage.setItem('theme', this.actualColor);
  }

  changeColor(color: string): void {
    this.removeAllCollor();
    this.actualColor = color + '-' + this.mode;
    document.body.classList.add(this.actualColor);
    localStorage.setItem('theme', this.actualColor);
  }

  removeAllCollor(): void {
    document.body.classList.remove(this.actualColor);
  }

  sameColor(color: string): boolean {
    return this.actualColor.startsWith(color);
  }

  menuNavigation(path: string): void {
    this.navigateAndUrlinfo.navigate(true, path);
  }
}
