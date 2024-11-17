import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const navigations: Array<string> = [
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
    if (path && navigations.includes(path)) {
      if (basicSide) {
        this.router.navigateByUrl(`private/${path}`);
      } else {
        this.router.navigateByUrl(`${this.actualUrl}/${path}`);
      }
    }
  }


}
