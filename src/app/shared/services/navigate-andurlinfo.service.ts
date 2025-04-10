import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const navigations: string[] = [
  'main',
  'own',
  'forum',
  'workshop',
  'addForum',
];

@Injectable({
  providedIn: 'root',
})
export class NavigateAndurlinfoService {
  constructor(private router: Router) {}

  actualUrl(): string {
    return this.router.url;
  }

  navigate(basicSide: boolean, path: string): void {
    if (path) {
      if (basicSide && navigations.includes(path)) {
        this.router.navigateByUrl(`private/${path}`);
      } else {
        this.router.navigateByUrl(`${this.actualUrl()}/${path}`);
      }
    }
  }

  basicNavigate(path: string): void {
    this.router.navigateByUrl(path);
  }

  endpoint(): string {
    return this.actualUrl().split('/')[this.actualUrl().split('/').length - 1];
  }
}
