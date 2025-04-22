import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { work } from '../../shared/interfaces/work';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private dataSource = new BehaviorSubject<any>(null);
  private workArraySource = new BehaviorSubject<any>(null);
  public currentData = this.dataSource.asObservable();
  public actualUsersWorkArray = this.workArraySource.asObservable();
  constructor() {}

  changeData(data: any) {
    this.dataSource.next(data);
  }

  setActualUserWorkArray(data:Array<work>){
    this.workArraySource.next(data)
  }


}
