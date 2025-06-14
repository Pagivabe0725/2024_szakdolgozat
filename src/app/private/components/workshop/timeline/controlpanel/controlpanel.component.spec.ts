import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlpanelComponent } from './controlpanel.component';

xdescribe('ControlpanelComponent', () => {
  let component: ControlpanelComponent;
  let fixture: ComponentFixture<ControlpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlpanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
