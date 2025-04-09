import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { NavigateAndurlinfoService } from '../../../shared/services/navigate-andurlinfo.service';

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let navigateMock: jasmine.SpyObj<NavigateAndurlinfoService>;
  beforeEach(async () => {
    navigateMock = jasmine.createSpyObj(NavigateAndurlinfoService, [
      'navigate',
    ]);
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: NavigateAndurlinfoService, useValue: navigateMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });

  describe('Before onInit', () => {
    it('mode should be light', () => {
      expect(component.mode).toEqual('light');
    });

    it('colorArray should be definied', () => {
      expect(component.colorArray).toEqual([
        'basic-light',
        'basic-dark',
        'azure-light',
        'azure-dark',
        'magenta-light',
        'magenta-dark',
        'cyan-light',
        'cyan-dark',
      ]);
    });

    it('actulaColor should be basic-light', () => {
      expect(component.actualColor).toBe('basic-light');
    });
  });

  describe('Basic tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      console.log(fixture.nativeElement);
    });

    describe('actualColor', () => {
      it('should set actualColor if localstorage is empty', async () => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
        await component.ngOnInit();
        expect(component.actualColor).toEqual('basic-light');
      });

      it('should set actualColor if localstorage is not empty', async () => {
        const randomColor =
          component.colorArray[
            Math.floor(Math.random() * component.colorArray.length)
          ];
        spyOn(localStorage, 'getItem').and.returnValue(randomColor);
        await component.ngOnInit();
        expect(component.actualColor).toEqual(randomColor);
        // console.log(randomColor);
      });
    });

    describe('mode', () => {
      it('should set mode if localstorage is empty', async () => {
        spyOn(localStorage, 'getItem').and.returnValue(null);
        await component.ngOnInit();
        expect(component.mode).toEqual('light');
      });

      it('should set mode if localStorage contains a dark theme', async () => {
        let randomColor = 'light';
        while (!randomColor.includes('dark')) {
          randomColor =
            component.colorArray[
              Math.floor(Math.random() * component.colorArray.length)
            ];
        }
        spyOn(localStorage, 'getItem').and.returnValue(randomColor);
        await component.ngOnInit();
        expect(component.mode).toEqual('dark');
        //console.log(randomColor);
      });

      it('should set mode if localStorage contains a light theme', async () => {
        let randomColor = 'dark';
        while (!randomColor.includes('light')) {
          randomColor =
            component.colorArray[
              Math.floor(Math.random() * component.colorArray.length)
            ];
        }
        spyOn(localStorage, 'getItem').and.returnValue(randomColor);
        await component.ngOnInit();
        expect(component.mode).toEqual('light');
        // console.log(randomColor);
      });
    });
  });

  describe('HTML structure and DOM rendering', () => {
    let html: HTMLElement;

    beforeEach(() => {
      html = fixture.nativeElement;
    });

    it('should collect correct background colors for each theme', async () => {
      let colorCodeArray: { [color: string]: string }[] = [];
      for (const theme of component.colorArray) {
        document.body.className = theme; // apply theme
        await fixture.detectChanges();

        const element = fixture.nativeElement.querySelector('mat-toolbar')!;
        const bg = getComputedStyle(element).backgroundColor;
        colorCodeArray.push({ [theme]: bg });
      }

      const randomNumber = Math.floor(
        Math.random() * component.colorArray.length
      );
      const randomColor: string = component.colorArray[randomNumber];

      document.body.className = randomColor;
      await fixture.detectChanges();
      const element = fixture.nativeElement.querySelector('mat-toolbar')!;
      const bg = getComputedStyle(element).backgroundColor;
      expect(bg).toEqual(Object.values(colorCodeArray[randomNumber])[0]);
      console.table(colorCodeArray);
    });
  });

  describe('Functions', () => {
    it('changeDarkness function should switch from light to dark theme correctly for each theme', async () => {
      spyOn(component, 'removeAllCollor').and.callFake(() => {
        document.body.className = '';
      });
      for (const color of component.colorArray) {
        if (color.includes('light')) {
          document.body.className = '';

          const expectedTheme = color.split('-')[0] + `-dark`;

          component.mode = 'light';
          component.actualColor = color;

          await component.changeDarkness();
          fixture.detectChanges();

          expect(component.mode).toBe('dark');
          expect(component.actualColor).toBe(expectedTheme);
          expect(document.body.classList.contains(expectedTheme)).toBeTrue();
        }
      }
    });

    it('should switch actualColor and apply theme class correctly', async () => {
      spyOn(component, 'removeAllCollor').and.callFake(() => {
        document.body.className = '';
      });
      for (const fullTheme of component.colorArray) {
        const [baseColor, mode] = fullTheme.split('-');

        component.actualColor = fullTheme;
        component.mode = mode as 'light' | 'dark';

        const otherColor = component.colorArray
          .map((c) => c.split('-')[0])
          .filter((c) => c !== baseColor)[0];

        const expectedTheme = `${otherColor}-${mode}`;

        await component.changeColor(otherColor);
        fixture.detectChanges();

        expect(component.actualColor).toBe(expectedTheme);
        expect(component.mode).toBe(mode);
        expect(document.body.classList.contains(expectedTheme)).toBeTrue();
        expect(localStorage.getItem('theme')).toBe(expectedTheme);
      }
    });

    /// valamiért nem jelzi a lefedetségnél
    it('removeAllCollor should work', async () => {
      component.actualColor = 'test-theme';
      document.body.classList.add('test-theme');
      component.removeAllCollor();
      expect(document.body.classList.contains('test-theme')).toBeFalse();
    });

    it('sameColor should work', async () => {
      ///test
      for (let i = 0; i < 1000; i++) {
        component.colorArray.forEach((i) => {
          component.actualColor = i;
          expect(component.sameColor(i.split('-')[0])).toBeTrue();
        });
        
      }
    
    });
  });
});
