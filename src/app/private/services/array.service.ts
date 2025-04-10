import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArrayService {


  getIndex(element: string, array: string[]): number {
    let i = 0;
    for (const iterator of array) {
      if (element === iterator) {
        return i;
      }
      i++;
    }
    return i;
  }

  elementInArray(element: string, array: string[]): boolean {
    return array.includes(element);
  }

  deleteElementFromArray(element: string, array: string[]): string[] {
    if (this.elementInArray(element, array)) {
      return array.splice(this.getIndex(element, array), 1);
    }
    return array;
  }

  addElementToArray(element: string, array: string[]): string[] {
    array.push(element);
    return array;
  }
}
