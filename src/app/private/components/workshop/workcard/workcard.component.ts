import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-workcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workcard.component.html',
  styleUrl: './workcard.component.scss'
})
export class WorkcardComponent {

  protected points:Array<string>=['Név','Létrehozó','Létrehozva','Módosítva','Befejezve']


}
