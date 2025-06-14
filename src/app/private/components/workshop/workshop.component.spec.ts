import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopComponent } from './workshop.component';

xdescribe('WorkshopComponent', () => {
  let component: WorkshopComponent;
  let fixture: ComponentFixture<WorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
