import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Dialog } from '../../interfaces/dialog';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent implements OnInit {
  protected actualDialog?: Dialog;
  public commentControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(50),
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PopupComponent>
  ) {}

  ngOnInit(): void {
    this.actualDialog = this.data as Dialog;
  }

  close(value: boolean) {
    this.dialogRef.close(value);
  }

  closeReturnWithComment(value: boolean) {
    if (value ) {
      if(this.commentControl.valid){
      this.dialogRef.close(this.commentControl.value);
      }
    } else {
      this.dialogRef.close('');
    }
  }
}
