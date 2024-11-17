import { Component, HostListener, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-addforum',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './addforum.component.html',
  styleUrl: './addforum.component.scss',
})
export class AddforumComponent implements OnInit {
  @HostListener('window:resize', ['$event']) reSize() {
    this.textAreaRowCalculator();
  }
  protected forumForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
    ]),
    category: new FormControl('', Validators.required),
  });

  constructor(private navigationService: NavigateAndurlinfoService) {}

  ngOnInit(): void {
    this.textAreaRowCalculator();
  }

  textAreaRowCalculator(): void {
    const textareaHeight: number = document.getElementById('textarea')
      ?.parentElement?.parentElement?.parentElement?.offsetHeight as number;
    (document.getElementById('textarea') as HTMLTextAreaElement).rows =
      Math.floor(textareaHeight / 26);
  }

  back(): void {
    this.navigationService.navigate(true, 'forum');
  }

  clearFormFields(): void {
    this.forumForm.reset();
  }
}
