import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { infoboxInMain_component } from '../../../shared/interfaces/info_board';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const infoBoxTemplate: infoboxInMain_component = {
  icon: 'sensor_door',
  title: 'something',
  text: 'it is the text',
  color: 'primary',
};

fdescribe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default number of columns when input data is missing from parent', () => {
    const html: HTMLElement = fixture.nativeElement;
    expect(
      html.querySelector('.own-page_component-grid-display-2column')
    ).toBeTruthy();
  });

  it('should display the correct number of columns (2)', async () => {
    component.color = 'none';
    component.columns = 2;
    component.actualInfoBoardArray = [
      { ...infoBoxTemplate },
      { ...infoBoxTemplate },
      { ...infoBoxTemplate },
    ];
    await fixture.detectChanges();
    const html: HTMLElement = fixture.nativeElement;
    expect(
      html.querySelector('.own-page_component-grid-display-2column')
    ).toBeTruthy();
    console.log(html);
  });

  it('should display the correct number of columns (3)', async () => {
    component.color = 'none';
    component.columns = 3;
    component.actualInfoBoardArray = [
      { ...infoBoxTemplate },
      { ...infoBoxTemplate },
      { ...infoBoxTemplate },
    ];
    await fixture.detectChanges();
    const html: HTMLElement = fixture.nativeElement;
    expect(
      html.querySelector('.own-page_component-grid-display-3column')
    ).toBeTruthy();
    console.log(html);
  });

  it('page component should contain the correct number of "app-infoboard-in-main"', async () => {
    component.color = 'none';
    component.columns = 3;
    component.actualInfoBoardArray = [
      { ...infoBoxTemplate },
      { ...infoBoxTemplate },
      { ...infoBoxTemplate },
    ];

    await fixture.detectChanges();
    let html: HTMLElement = fixture.nativeElement;
    expect(html.querySelectorAll('app-infoboard-in-main').length).toEqual(
      component.actualInfoBoardArray.length
    );

    component.columns = 2;
    component.actualInfoBoardArray = [
      { ...infoBoxTemplate },
      { ...infoBoxTemplate },
    ];

    await fixture.detectChanges();
    html = fixture.nativeElement;
    expect(html.querySelectorAll('app-infoboard-in-main').length).toEqual(
      component.actualInfoBoardArray.length
    );
  });

  it('should apply the correct background color to the page component', async () => {
    component.actualInfoBoardArray = [
      { ...infoBoxTemplate },
      { ...infoBoxTemplate },
    ];
    await fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    let page = html.querySelector('.page-component') as HTMLElement;

    const colors = [
      { color: '', class: '' },
      { color: 'primary', class: 'own-primary-background' },
      { color: 'highlight', class: 'own-primary-highlight-background' },
      { color: 'accent', class: 'own-accent-background' },
    ];

    for (const { color, class: expectedClass } of colors) {
      component.color = color as 'primary' | 'accent' | 'highlight' | 'none';
      await fixture.detectChanges();

      page = fixture.nativeElement.querySelector(
        '.page-component'
      ) as HTMLElement;

      expect(page.classList.contains('own-primary-background')).toBe(
        expectedClass === 'own-primary-background'
      );
      expect(page.classList.contains('own-primary-highlight-background')).toBe(
        expectedClass === 'own-primary-highlight-background'
      );
      expect(page.classList.contains('own-accent-background')).toBe(
        expectedClass === 'own-accent-background'
      );
    }
  });
});
