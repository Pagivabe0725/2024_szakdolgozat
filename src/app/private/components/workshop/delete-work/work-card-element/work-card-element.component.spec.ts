import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCardElementComponent } from './work-card-element.component';

xdescribe('WorkCardElementComponent', () => {
  let component: WorkCardElementComponent;
  let fixture: ComponentFixture<WorkCardElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkCardElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCardElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
