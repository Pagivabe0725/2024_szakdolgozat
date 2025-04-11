import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'ownDateFormater',
  standalone: true
})
export class OwnDateFormaterPipe implements PipeTransform {

  transform(value: Timestamp): string {
    if (!(value instanceof Timestamp)) {
      throw new Error('OwnDateFormaterPipe csak Firebase Timestamp típusú értéket fogad el!');
    }

    const date = value.toDate(); // átalakítás JavaScript Date-re

    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hour = this.padZero(date.getHours());
    const minute = this.padZero(date.getMinutes());

    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  private padZero(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

}
