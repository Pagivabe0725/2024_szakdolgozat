import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { work } from '../../../../../shared/interfaces/work';
import { workComment } from '../../../../../shared/interfaces/workComment';

@Component({
  selector: 'app-work-message-comment',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './work-message-comment.component.html',
  styleUrl: './work-message-comment.component.scss',
})
export class WorkMessageCommentComponent {
  @Input() public darkmode!: boolean;
  @Input() public actualWork!: work;
  @Input() public comment!: workComment;
  @Output() public deleteCommentEvent: EventEmitter<string> =
    new EventEmitter();
  public actualCommentContent: string = '';

  @Output() public modifyCommentEvent: EventEmitter<{'id':string,content:string}> = new EventEmitter()

  
  displayCommentDeleteButton(): boolean {
    const userId = localStorage.getItem('userId')!;

    return (
      this.comment.author.id === userId || userId === this.actualWork.author.id
    );
  }


  isModifiable():boolean{
    return this.comment.author.id === localStorage.getItem('userId')
  }

  commentModification(comment:workComment):void{

    this.modifyCommentEvent.emit({id:comment.id,content:comment.content})

  }


}
