import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCreatorComponent } from './work-creator.component';

xdescribe('WorkCreatorComponent', () => {
  let component: WorkCreatorComponent;
  let fixture: ComponentFixture<WorkCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
