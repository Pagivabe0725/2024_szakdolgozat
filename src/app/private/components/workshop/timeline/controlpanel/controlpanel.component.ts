import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { work } from '../../../../../shared/interfaces/work';
import { OwnDateFormaterPipe } from '../../../../../shared/pipes/own-date-formater.pipe';
import { NavigateAndurlinfoService } from '../../../../../shared/services/navigate-andurlinfo.service';
import { CollectionService } from '../../../../../shared/services/collection.service';
import { PopupService } from '../../../../../shared/services/popup.service';
import { Dialog } from '../../../../../shared/interfaces/dialog';
import { take } from 'rxjs';
import { SharedDataService } from '../../../../services/shared-data.service';
import { workMessage } from '../../../../../shared/interfaces/workMessage';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-controlpanel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, OwnDateFormaterPipe, MatIconModule],
  templateUrl: './controlpanel.component.html',
  styleUrl: './controlpanel.component.scss',
})
export class ControlpanelComponent implements OnInit {
  @Input() public darkmode?: boolean;
  @Input() public actualWork!: work;
  @Input() public downloadable = false;
  @Input() public downloadFileId: string | undefined;
  @Output() public reverseEvent: EventEmitter<'increase' | 'decrease'> =
    new EventEmitter();
  protected order: 'increase' | 'decrease' = 'increase';
  protected userId = localStorage.getItem('userId');
  private dialogTemplate!: Dialog;
  constructor(
    private navigateAndUrlInfoService: NavigateAndurlinfoService,
    private collectionService: CollectionService,
    private popupService: PopupService,
    private sharedDataService: SharedDataService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.dialogTemplate = {
      ...this.popupService.getTemplateDialog(),
      action: true,
      title: this.actualWork.finished ? 'Újraindítod' : 'Befejezed',
      content: this.actualWork.finished
        ? 'Biztosan újra akarod indítani a munkát?'
        : 'Biztosan befejezed a munkát?',
      hostComponent: 'ControlpanelComponent',
    };
  }

  message(): void {
    this.sharedDataService.updateWorkElementContent({} as workMessage);
    this.navigateAndUrlInfoService.basicNavigate(
      `private/message/${this.actualWork.id}`
    );
  }

  finishOrStartWork(): void {
    this.popupService
      .displayPopUp(this.dialogTemplate)
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.collectionService
            .updateDatas('Works', this.actualWork.id, {
              ...this.actualWork,
              finished: !this.actualWork.finished,
            })
            .then(() => {
              this.navigateAndUrlInfoService.basicNavigate(`private/workshop`);
            });
        }
      });
  }

  reverse(): void {
    this.order = this.order === 'increase' ? 'decrease' : 'increase';
    this.reverseEvent.emit(this.order);
  }

  async download(): Promise<void> {
    await this.storageService.downloadFile(
      `Works/${this.downloadFileId}/munka.zip`,
      'munka.zip'
    );
  }

  isPageScrollable(): boolean {
    return document.documentElement.scrollHeight > window.innerHeight;
  }

  scrollPage(direction: 'up' | 'down'): void {
    const top = direction === 'up' ? 0 : document.documentElement.scrollHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
