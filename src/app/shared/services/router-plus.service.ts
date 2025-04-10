import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterPlusService {
  constructor(private router: Router) {}

  getURLEndPoint(): string {
    const urlElementsArray: string[] = this.getURLElementsInArray();
    return urlElementsArray[urlElementsArray.length - 1];
  }

  getURLElementsInArray(): string[] {
    return this.router.url.split('/');
  }

  getURLElementsInString(subtracted: number): string {
    let path = '';
    for (let i = 0; i < this.getURLElementsInArray().length - subtracted; i++) {
      path += this.getURLElementsInArray()[i] + '/';
    }
    return path;
  }

  navigateToNewPage(page: string): void {
    this.router.navigateByUrl(this.getURLElementsInString(1) + page);
  }

  navigateToChildPage(page: string): void {
    this.router.navigateByUrl(this.getURLElementsInString(0) + page);
  }
}
