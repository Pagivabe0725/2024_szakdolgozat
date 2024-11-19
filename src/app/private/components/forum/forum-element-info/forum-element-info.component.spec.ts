import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumElementInfoComponent } from './forum-element-info.component';

describe('ForumElementInfoComponent', () => {
  let component: ForumElementInfoComponent;
  let fixture: ComponentFixture<ForumElementInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumElementInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumElementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
