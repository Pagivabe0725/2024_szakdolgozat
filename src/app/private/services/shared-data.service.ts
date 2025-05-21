import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { workMessage } from '../../shared/interfaces/workMessage';
import { forum } from '../../shared/interfaces/forum';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private workElementContent = new BehaviorSubject<workMessage>(
    {} as workMessage
  );
  public workElementContentSource = this.workElementContent.asObservable();
  private forum = new BehaviorSubject<forum>({} as forum);
  public forumSource = this.forum.asObservable();
  constructor() {}

  updateWork(forum: forum): void {
    this.forum.next(forum);
  }

  updateWorkElementContent(workMessage: workMessage): void {
    this.workElementContent.next(workMessage);
  }
}
