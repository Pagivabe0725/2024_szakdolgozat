import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
      hostComponent: 'LoginComponent',
      title: '',
      content: '',
      action: false,
      hasInput: false,
      inputContent:undefined
    } as Dialog;
  }

  displayPopUp(actualDialog: Dialog): MatDialogRef<PopupComponent, any> {
    return this.matDialog.open(PopupComponent, {
      width: '50%',
      height: '50%',
      data: actualDialog as Dialog,
    });
  }
}
