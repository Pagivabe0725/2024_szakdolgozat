import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';
import { UserService } from '../../../shared/services/user.service';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    SidenavComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
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
  public width: number = window.innerWidth;
  public height: number = window.innerHeight;
  public sidenav = false;
  constructor(
    private navigateAndUrlinfo: NavigateAndurlinfoService,
    private userService: UserService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    console.log(this.width);
  }

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

  logout(): void {
    this.userService.logout().then((_) => {
      this.navigateAndUrlinfo.basicNavigate('public/login');
    });
  }
}
