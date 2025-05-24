import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsideConsoleComponent } from './leftside-console.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigateAndurlinfoService } from '../../../../shared/services/navigate-andurlinfo.service';

describe('LeftsideConsoleComponent', () => {
  let component: LeftsideConsoleComponent;
  let fixture: ComponentFixture<LeftsideConsoleComponent>;
  let navigationServiceMock: jasmine.SpyObj<NavigateAndurlinfoService>;
  beforeEach(async () => {
    navigationServiceMock = jasmine.createSpyObj('NavigateAndurlinfoService', [
      'navigate',
    ]);

    await TestBed.configureTestingModule({
      imports: [LeftsideConsoleComponent, BrowserAnimationsModule],
      providers: [
        { provide: NavigateAndurlinfoService, useValue: navigationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftsideConsoleComponent);
    component = fixture.componentInstance;
    component.categoryTitleArray = ['alma', '2', '3', '4', '5'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('categoryTitleArray should be correct', () => {
    expect(component.categoryTitleArray).toEqual(['alma', '2', '3', '4', '5']);
  });

  it('state should be a signal(close)', () => {
    expect(component['state']()).toEqual('close');
  });

  it('listVisible should be false', () => {
    expect(component['listVisible']).toBeFalse();
  });

  it('changeMenu should open the div', async () => {
    await component.changeMenuSize();
    expect(component['state']()).toEqual('open');
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(component['listVisible']).toBeTrue();
  });

  it('changeMenu should close the div', async () => {
    component.changeMenuSize();
    component.changeMenuSize();
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(component['state']()).toEqual('close');
    expect(component['listVisible']).toBeFalse();
  });

  it('should display all elements from categoryArray', async () => {
    component['listVisible'] = true;
    fixture.detectChanges();
    const html: HTMLElement = fixture.nativeElement;
    html
      .querySelectorAll('.own-leftside-console_component-list-element')
      .forEach((i, index) => {
        expect(component.categoryTitleArray[index]).toEqual(i.innerHTML.trim());
      });
  });

  it('should navigate to addForum when button is clicked', async () => {
    const button = fixture.nativeElement.querySelector('#own-add-button');

    button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(navigationServiceMock.navigate).toHaveBeenCalledWith(
      true,
      'addForum'
    );
  });
});
