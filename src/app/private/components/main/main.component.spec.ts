import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from '../page/page.component';
import { infoboxInMain_component } from '../../../shared/interfaces/info_board';
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
