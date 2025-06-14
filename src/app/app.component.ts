import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage.getItem('theme')) {
      document.body.classList.add(localStorage.getItem('theme')!);
    } else {
      document.body.classList.add('basic-light');
      localStorage.setItem('theme', 'basic-light');
    }
  }
}
