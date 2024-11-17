import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnComponent } from './own.component';

describe('OwnComponent', () => {
  let component: OwnComponent;
  let fixture: ComponentFixture<OwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
