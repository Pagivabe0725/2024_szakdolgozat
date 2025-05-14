import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideControllerComponent } from './left-side-controller.component';

xdescribe('LeftSideControllerComponent', () => {
  let component: LeftSideControllerComponent;
  let fixture: ComponentFixture<LeftSideControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftSideControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftSideControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
