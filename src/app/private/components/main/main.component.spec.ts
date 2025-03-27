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
      imports: [MainComponent,PageComponent,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', async() => {
    await fixture.whenStable()
    //expect(component).toBeTruthy();
  });
});
