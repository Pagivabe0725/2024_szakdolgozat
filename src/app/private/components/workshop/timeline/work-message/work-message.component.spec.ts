import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMessageComponent } from './work-message.component';

describe('WorkMessageComponent', () => {
  let component: WorkMessageComponent;
  let fixture: ComponentFixture<WorkMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
