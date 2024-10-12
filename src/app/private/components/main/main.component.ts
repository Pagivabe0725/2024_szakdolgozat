import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
