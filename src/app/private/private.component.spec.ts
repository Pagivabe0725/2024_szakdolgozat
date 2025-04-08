import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PrivateComponent } from './private.component';
import { Routes } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { fakeAsync, tick } from '@angular/core/testing';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumComponent } from './components/forum/forum.component';
import { Component } from '@angular/core';

@Component({
  template: '<p>Forum component</p>',
  standalone: true,
})
class DummyForumComponent {}

@Component({
  template: '<p>Workshop component</p>',
  standalone: true,
})
class DummyWorkshopComponent {}

@Component({
  template: '<p>Own component</p>',
  standalone: true,
})
class DummyOwnComponent {}

@Component({
  template: '<p>Main component</p>',
  standalone: true,
})
class DummyMainComponent {}

const routes: Routes = [
  { path: 'main', component: DummyMainComponent },
  { path: 'forum', component: DummyForumComponent },
  {
    path: 'workshop',
    component: DummyWorkshopComponent,
  },

  {
    path: 'own',
    component: DummyOwnComponent,
  },
];

let router: Router;
let location: Location;

fdescribe('PrivateComponent', () => {
  let component: PrivateComponent;
  let fixture: ComponentFixture<PrivateComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PrivateComponent,
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
      ],
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

  it('should load DummyForumComponent on navigating to /forum', async () => {
    router.navigate(['/forum']);

    await fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    const dummy: HTMLElement = html.querySelector('ng-component')!;
    expect(dummy.querySelector('p')!.textContent).toContain('Forum component');
  });

  it('should load DummyForumComponent on navigating to /main', async () => {
    router.navigate(['/main']);

    await fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    const dummy: HTMLElement = html.querySelector('ng-component')!;
    expect(dummy.querySelector('p')!.textContent).toContain('Main component');
  });

  it('should load DummyForumComponent on navigating to /workshop', async () => {
    router.navigate(['/workshop']);

    await fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    const dummy: HTMLElement = html.querySelector('ng-component')!;
    expect(dummy.querySelector('p')!.textContent).toContain(
      'Workshop component'
    );
  });

  it('should load DummyForumComponent on navigating to /own', async () => {
    router.navigate(['/own']);

    await fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    const dummy: HTMLElement = html.querySelector('ng-component')!;
    expect(dummy.querySelector('p')!.textContent).toContain('Own component');
  });
});
