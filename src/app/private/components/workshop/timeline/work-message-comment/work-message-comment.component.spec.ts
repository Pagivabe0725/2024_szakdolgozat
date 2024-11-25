import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkMessageCommentComponent } from './work-message-comment.component';

describe('WorkMessageCommentComponent', () => {
  let component: WorkMessageCommentComponent;
  let fixture: ComponentFixture<WorkMessageCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkMessageCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkMessageCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
