import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { work } from '../../../../../shared/interfaces/work';
import { OwnDateFormaterPipe } from '../../../../../shared/pipes/own-date-formater.pipe';
import { NavigateAndurlinfoService } from '../../../../../shared/services/navigate-andurlinfo.service';
import { CollectionService } from '../../../../../shared/services/collection.service';
import { PopupService } from '../../../../../shared/services/popup.service';
import { Dialog } from '../../../../../shared/interfaces/dialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-controlpanel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, OwnDateFormaterPipe],
  templateUrl: './controlpanel.component.html',
  styleUrl: './controlpanel.component.scss',
})
export class ControlpanelComponent implements OnInit {
  @Input() public darkmode?: boolean;
  @Input() public actualWork!: work;
  protected userId = localStorage.getItem('userId');
  private dialogTemplate!: Dialog;
  constructor(
    private navigateAndUrlInfoService: NavigateAndurlinfoService,
    private collectionService: CollectionService,
    private popupService: PopupService
  ) {}
  ngOnInit(): void {
    console.log(this.darkmode);
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
}
