import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from '../page/page.component';
import { MainComponent } from './main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent, PageComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set icon to sunny if theme includes dark', () => {
    localStorage.setItem('Theme', 'dark-valami');
    const fixture = TestBed.createComponent(MainComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component['infoBoardFirstArray'][1].icon).toBe('sunny');
  });

  it('should set icon to brightness_2 if theme does not include dark', () => {
    localStorage.setItem('Theme', 'light-valami');
    const fixture = TestBed.createComponent(MainComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component['infoBoardFirstArray'][1].icon).toBe('brightness_2');
  });

  it('should set icon to brightness_2 when theme is null or empty', () => {
    localStorage.removeItem('Theme');
    const fixture = TestBed.createComponent(MainComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component['infoBoardFirstArray'][1].icon).toBe('brightness_2');
  });

  it('should render the correct number of Page components', async () => {
    let expectedNumber = 0;
    for (const i of component.getComponentVariables()) {
      if (i.includes('infoBoard')) {
        expectedNumber++;
      }
    }
    const compiled = fixture.nativeElement as HTMLElement;
    const pageComponents = compiled.querySelectorAll('app-page');
    expect(pageComponents.length).toBe(expectedNumber);
  });
});
