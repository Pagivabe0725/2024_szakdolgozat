import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { work } from '../../../../../shared/interfaces/work';
import { workMessage } from '../../../../../shared/interfaces/workMessage';
import { CollectionService } from '../../../../../shared/services/collection.service';
import { user } from '../../../../../shared/interfaces/user';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-work-message',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './work-message.component.html',
  styleUrl: './work-message.component.scss',
})
export class WorkMessageComponent implements OnInit {
  @Input() public darkmode!: boolean;
  @Input() public actualMessage!: workMessage;
  @Output() public commentEvent: EventEmitter<number> = new EventEmitter();
  @Input() public index!: number;
  @Input() public actualUser!: user | undefined;
  @Input() public commentable:boolean = false

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.collectionService
      .getCollectionByCollectionAndDoc('Users', this.actualMessage.userId)
      .pipe(take(1))
      .subscribe((user) => console.log(user));
  }

  openCommentInput(): void {
    this.commentEvent.emit(this.index);
  }
}
