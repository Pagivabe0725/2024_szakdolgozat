import { ComponentFixture, TestBed } from '@angular/core/testing';
import { infoboxInMain_component } from '../../../shared/interfaces/info_board';
import { InfoboardInMainComponent } from './infoboard-in-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

function randomActualInfoBoard(): infoboxInMain_component {
  const options: ('primary' | 'accent' | 'highlight' | 'none')[] = [
    'highlight',
    'accent',
    'primary',
    'none',
  ];
  const randomNumber = Math.floor(Math.random() * options.length);

  const actualInfoBoard: infoboxInMain_component = {
    title: 'valami',
    icon: 'sunny',
    text: 'valami',
    color: options[randomNumber],
  };

  return actualInfoBoard;
}

fdescribe('InfoboardInMainComponent', () => {
  let component: InfoboardInMainComponent;
  let fixture: ComponentFixture<InfoboardInMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoboardInMainComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoboardInMainComponent);
    component = fixture.componentInstance;
    component.actualInfoBoard = randomActualInfoBoard();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger onMouseOver and update variables', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Esemény szimulálása
    expect(component['animation']()).toEqual('close');
    expect(component['animationFinished']).toBeFalse();
    compiled.dispatchEvent(new Event('mouseover'));
    expect(component['animationFinished']).toBeTrue();
    expect(component['animation']()).toEqual('open');
  });

  it('should trigger onMouseLeave and update variables', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.dispatchEvent(new Event('mouseover'));
    expect(component['animation']()).toEqual('open');
    expect(component['animationFinished']).toBeTrue();
    // Esemény szimulálása
    compiled.dispatchEvent(new Event('mouseleave'));
    expect(component['animationFinished']).toBeFalse();
    expect(component['animation']()).toEqual('close');
  });

  it('should have collectionDisplay property set to false by default', () => {
    expect(component['collectionDisplay']).toBeFalse();
  });

  it('should set collectionDisplay property true by onMouseOver event', async () => {
    expect(component['collectionDisplay']).toBeFalse();
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.dispatchEvent(new Event('mouseover'));
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(component['collectionDisplay']).toBeTrue();
  });

  it('should set collectionDisplay property false by onMouseLeave event', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.dispatchEvent(new Event('mouseover'));
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(component['collectionDisplay']).toBeTrue();
    compiled.dispatchEvent(new Event('mouseleave'));
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(component['collectionDisplay']).toBeFalse();
  });

  it('getTheme function works', () => {
    localStorage.clear();

    expect(component.getTheme()).toBeFalse();
    localStorage.setItem('Theme', 'dark-valami');

    console.log(component.getTheme());
    expect(component.getTheme()).toBeTrue();
    localStorage.setItem('Theme', 'light-valami');

    expect(component.getTheme()).toBeFalse();
  });

  it('should apply the correct background color to the infoboard-in-main component', async () => {
    await fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    console.log(html);
    //let page = html.querySelector('.page-component') as HTMLElement;
    let mat_card: HTMLElement = html.querySelector('mat-card')!;

    const colors = [
      { color: '', class: '' },
      { color: 'primary', class: 'own-primary-background' },
      { color: 'highlight', class: 'own-primary-highlight-background' },
      { color: 'accent', class: 'own-accent-background' },
    ];

    for (const { color, class: expectedClass } of colors) {
      component.actualInfoBoard = {
        title: 'soething',
        text: 'text',
        color: color as 'primary' | 'accent' | 'highlight' | 'none',
        icon: 'sunny',
      };
      await fixture.detectChanges();
      mat_card = fixture.nativeElement.querySelector('mat-card') as HTMLElement;

      expect(mat_card.classList.contains('own-primary-background')).toBe(
        expectedClass === 'own-primary-background'
      );
      expect(
        mat_card.classList.contains('own-primary-highlight-background')
      ).toBe(expectedClass === 'own-primary-highlight-background');
      expect(mat_card.classList.contains('own-accent-background')).toBe(
        expectedClass === 'own-accent-background'
      );
    }
  });
});
