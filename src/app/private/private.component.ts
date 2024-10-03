import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [MenuComponent,RouterOutlet],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss'
})
export class PrivateComponent {

}
