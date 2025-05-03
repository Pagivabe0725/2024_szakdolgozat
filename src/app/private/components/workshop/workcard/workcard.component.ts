import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { work } from '../../../../shared/interfaces/work';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workcard.component.html',
  styleUrl: './workcard.component.scss',
})
export class WorkcardComponent implements OnInit {
  @Input() work!: work;
  protected points: Array<string> = [
    'Név:',
    'Készitő:',
    'Létrehozva:',
    'Módosítva:',
    'Befejezve:',
  ];
  private ownProjects: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.points = [
      [this.points[0]] + this.work.name,
      [this.points[1]] +
        this.work.author.lastName +
        ' ' +
        this.work.author.firstName,
      [this.points[2]] + this.work.created.toDate().toDateString(),
      [this.points[3]] + this.work.modified.toDate().toDateString(),
      [this.points[4]] + (this.work.finished ? 'Befejezve' : 'Nincs befejezve'),
    ];
  }

  switchOwnProject(): void {
    this.ownProjects = !this.ownProjects;
  }

  workLoader(): void {
    this.router.navigateByUrl(`private/workshop/${this.work.id}`);
  }
}
