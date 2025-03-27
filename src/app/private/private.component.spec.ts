import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateComponent } from './private.component';

fdescribe('PrivateComponent', () => {
  let component: PrivateComponent;
  let fixture: ComponentFixture<PrivateComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain app-menu component', () => {
    expect(compiled.querySelector('app-menu')).toBeTruthy();
  });

  it('should contain a container div', () => {
    const element = fixture.nativeElement.querySelector(
      '#own-private_component-container-div'
    );
    expect(element.getAttribute('id')).toBe(
      'own-private_component-container-div'
    );
    expect(element.tagName).toEqual('DIV');
  });
});
