import { Component, EventEmitter, Input, Output } from '@angular/core';
import { work } from '../../../../../shared/interfaces/work';
import { CommonModule } from '@angular/common';
import { OwnDateFormaterPipe } from '../../../../../shared/pipes/own-date-formater.pipe';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-work-card-element',
  standalone: true,
  imports: [CommonModule , OwnDateFormaterPipe, MatIconModule, MatButtonModule],
  templateUrl: './work-card-element.component.html',
  styleUrl: './work-card-element.component.scss'
})
export class WorkCardElementComponent {

  @Input() actualWork!:work
  @Input() darkmode!:boolean
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter()

constructor(){}

}
