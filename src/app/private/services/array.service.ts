import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArrayService {
  constructor() {}

  getIndex(element: string, array: Array<string>): number {
    let i = 0;
    for (const iterator of array) {
      if (element === iterator) {
        return i;
      }
      i++;
    }
    return i;
  }

  elementInArray(element: string, array: Array<string>): boolean {
    return array.includes(element);
  }

  deleteElementFromArray(element: string, array: Array<string>): Array<string> {
    if (this.elementInArray(element, array)) {
      return array.splice(this.getIndex(element, array), 1);
    }
    return array;
  }

  addElementToArray(element: string, array: Array<string>): Array<string> {
    array.push(element);
    return array;
  }
}
