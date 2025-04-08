import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PrivateComponent } from './private.component';
import { Routes } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fakeAsync, tick } from '@angular/core/testing';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [{ path: 'main', component: MainComponent }];

let router: Router;
let location: Location;

fdescribe('PrivateComponent', () => {
  let component: PrivateComponent;
  let fixture: ComponentFixture<PrivateComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateComponent, RouterTestingModule.withRoutes(routes),BrowserAnimationsModule],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(PrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;

    router.initialNavigation();
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

  it('should contain router-outlet', () => {
    const html: HTMLElement = fixture.nativeElement;
    const outlet = html.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });

  it('should load MainComponent on navigating to /main', fakeAsync(() => {
    router.navigate(['/main']);
    tick();
    fixture.detectChanges();
  
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('app-main')).toBeTruthy();
    console.log(html)
  }));


});
