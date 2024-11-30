import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../components/popup/popup.component';
import { Dialog } from '../interfaces/dialog';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private matDialog: MatDialog) {}

  getTemplateDialog(): Dialog {
    return {
      width: '70%',
      height: '70%',
      hostComponent: '',
      title: '',
      content: '',
      action: false,
    } as Dialog;
  }

  displayPopUp(actualDialog: Dialog) {
    return this.matDialog.open(PopupComponent, {
      width: '50%',
      height: '50%',
      data: actualDialog as Dialog,
    });
  }
}
