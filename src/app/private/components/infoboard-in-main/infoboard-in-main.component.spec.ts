import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoboardInMainComponent } from './infoboard-in-main.component';

describe('InfoboardInMainComponent', () => {
  let component: InfoboardInMainComponent;
  let fixture: ComponentFixture<InfoboardInMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoboardInMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoboardInMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
