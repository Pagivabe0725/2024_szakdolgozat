import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { work } from '../../shared/interfaces/work';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private dataSource = new BehaviorSubject<any>(null);
  private workArraySource = new BehaviorSubject<any>([]);
  public currentData = this.dataSource.asObservable();
  public actualUsersWorkInfoArray = this.workArraySource.asObservable();
  constructor() {}

  changeData(data: any) {
    this.dataSource.next(data);
  }

  setActualUserWorkInfoArray(data: Array<Array<string>>) {
    this.workArraySource.next(data);
  }
}
