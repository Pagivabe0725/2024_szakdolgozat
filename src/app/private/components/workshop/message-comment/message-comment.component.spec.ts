import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCommentComponent } from './message-comment.component';

xdescribe('MessageCommentComponent', () => {
  let component: MessageCommentComponent;
  let fixture: ComponentFixture<MessageCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
