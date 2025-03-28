import { Component } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { infoboxInMain_component } from '../../../shared/interfaces/info_board';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  protected infoBoardFirstArray: infoboxInMain_component[] = [
    {
      title: 'Témák',
      icon: 'trip_origin',
      text: 'Ezen menüpont alatt tudod változtatni a weboldal témáit',
      color: 'highlight',
    },
    {
      title: 'sötét/világos mód',
      icon: (localStorage.getItem('Theme') || '').includes('dark')
        ? 'sunny'
        : 'brightness_2',

      text: 'Ezen menüpont alatt tudod beállítani, hogy a weboldal sötét, avagy világos módban jelenjen meg',
      color: 'accent',
    },
    {
      title: 'kilépés',
      icon: 'sensor_door',
      text: 'Ezen menüpont alatt tudsz kijelentkezni és elhagyni a weboldalt',
      color: 'highlight',
    },
  ];

  protected infoBoardSecondArray:  infoboxInMain_component[]= [
    {
      title: 'Account',
      icon: 'account_circle',
      text: 'Ezen menüpont alatt tudsz kijelentkezni és elhagyni a weboldalt',
      color: 'accent',
    },
    {
      title: 'Közösség',
      icon: 'groups',
      text: 'Ezen menüpont alatt tudsz kijelentkezni és elhagyni a weboldalt',
      color: 'accent',
    },
  ];

  getComponentVariables(): string[] {
    return Object.keys(this);
  }
}
