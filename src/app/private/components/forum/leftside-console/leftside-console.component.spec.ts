import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsideConsoleComponent } from './leftside-console.component';

describe('LeftsideConsoleComponent', () => {
  let component: LeftsideConsoleComponent;
  let fixture: ComponentFixture<LeftsideConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftsideConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftsideConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
