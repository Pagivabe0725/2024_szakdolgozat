import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { work } from '../../../../../shared/interfaces/work';
import { workMessage } from '../../../../../shared/interfaces/workMessage';
import { CollectionService } from '../../../../../shared/services/collection.service';
import { user } from '../../../../../shared/interfaces/user';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedDataService } from '../../../../services/shared-data.service';
import { NavigateAndurlinfoService } from '../../../../../shared/services/navigate-andurlinfo.service';
import { StorageService } from '../../../../services/storage.service';

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
  @Output() public commentEvent: EventEmitter<string> = new EventEmitter();
  @Input() public index!: number;
  @Input() public actualUser!: user | undefined;
  @Input() public commentable: boolean = false;
  @Input() public actualWork!: work;
  @Input() public downloadable = false;
  @Output() public deleteEvent: EventEmitter<{ id: string; index: number }> =
    new EventEmitter();

  constructor(
    private collectionService: CollectionService,
    private sharedDataService: SharedDataService,
    private navigateAndURLInfoService: NavigateAndurlinfoService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.collectionService
      .getCollectionByCollectionAndDoc('Users', this.actualMessage.userId)
      .pipe(take(1))
      .subscribe((user) => console.log(user));
  }

  openCommentInput(): void {
    this.commentEvent.emit(this.actualMessage.id);
  }

  isEditable(): boolean {
    return (
      this.actualMessage.userId === localStorage.getItem('userId') &&
      this.commentable
    );
  }

  canBeDeleted(): boolean {
    return (
      this.actualUser!.id === this.actualWork.userId ||
      this.actualUser!.id === this.actualMessage.userId
    );
  }

  editMessage(): void {
    this.sharedDataService.updateWorkElementContent(this.actualMessage);
    this.navigateAndURLInfoService.basicNavigate(
      `private/message/${this.actualWork.id}`
    );
  }

  async download(): Promise<void> {
    await this.storageService.downloadFile(
      `Works/${this.actualMessage.id}/munka.zip`,
      'munka.zip'
    );
  }

  deleteButtonVisibility(): boolean {
    const user = localStorage.getItem('userId');
    return (
      this.actualWork.userId === user || this.actualMessage.userId === user
    );
  }
}
