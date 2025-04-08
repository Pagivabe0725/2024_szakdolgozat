import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { infoboxInMain_component } from '../../../shared/interfaces/info_board';

const infoBoxTemplate:infoboxInMain_component = {
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
      imports: [PageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of columns (2)', () => {
    component.color='none';
    component.columns=2;
component.actualInfoBoardArray= [{...infoBoxTemplate},{...infoBoxTemplate}]
    const html:HTMLElement = fixture.nativeElement
    expect(html.querySelector('.own-page_component-grid-display-2column')).toBeTruthy()
    console.log(html)
  });
});
