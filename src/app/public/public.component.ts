import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSideComponent } from './components/left-side/left-side.component';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [LeftSideComponent,RouterOutlet],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
  
})
export class PublicComponent {

}
