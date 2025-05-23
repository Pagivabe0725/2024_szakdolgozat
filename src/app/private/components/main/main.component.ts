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
      title: 'Oldalsó menü',
      icon: 'menu',
      text: 'Ezen ikon alatt tudod megnyitni és bezárni az oldalsó menüt',
      color: 'highlight',
    },

    {
      title: 'Fiók',
      icon: 'account_circle',
      text: 'Ezen ikon alatt tudod megtekinteni a profilod',
      color: 'accent',
    },

    {
      title: 'Témák',
      icon: 'format_color_fill',
      text: 'Ezen ikon alatt tudod változtatni a weboldal témáit',
      color: 'highlight',
    },
  ];

  protected infoBoardSecondArray: infoboxInMain_component[] = [
    {
      title: 'Sötét mód',
      icon: 'brightness_2',

      text: 'Ezen ikon alatt tudod beállítani, hogy a weboldal sötét témájú legyen',
      color: 'accent',
    },
    {
      title: 'Világos mód',
      icon: 'sunny',
      text: 'Ezen ikon alatt tudod beállítani, hogy a weboldal világos témájú legyen',
      color: 'highlight',
    },
  ];

  protected infoBoardThirdArray: infoboxInMain_component[] = [
    {
      title: 'Műhelyek',
      icon: 'work',
      text: 'Ezen ikon alatt tudsz eljutni a műhelyek oldalra',
      color: 'accent',
    },
    {
      title: 'Fórumok',
      icon: 'chat',
      text: 'Ezen ikon alatt tudsz eljutni a fórumok oldalra',
      color: 'highlight',
    },

    {
      title: 'Főoldal',
      icon: 'home',
      text: 'Ezen ikon alatt tudsz visszajutni a jelenlegi oldalra',
      color: 'accent',
    },
  ];
  protected infoBoardFourthArray: infoboxInMain_component[] = [
    {
      title: 'Felgörgetés',
      icon: 'arrow_upward',
      text: 'Ezen ikon megnyomásával tudsz az oldal tetejére görgetni',
      color: 'accent',
    },
    {
      title: 'Legörgetés',
      icon: 'arrow_downward',
      text: 'Ezen ikon megnyomásával tudsz az oldal aljára görgetni',
      color: 'highlight',
    },
  ];
  protected infoBoardFifthArray: infoboxInMain_component[] = [
    {
      title: 'Törlés',
      icon: 'delete',
      text: 'Ezen ikonnal tudsz elemeket törölni az oldalon',
      color: 'accent',
    },
    {
      title: 'Módosítás',
      icon: 'edit',
      text: 'Ezen ikonnal tudsz elemeket múdosítani az oldalon',
      color: 'highlight',
    },

    {
      title: 'Kommentelés',
      icon: 'comment',
      text: 'Ezen ikon segítségével tudsz kommentelni',
      color: 'accent',
    },
  ];
  protected infoBoardSixthArray: infoboxInMain_component[] = [
    {
      title: 'Like',
      icon: 'favorite',
      text: 'Ezzel az ikonnal tudod kifejezni a tetszésedet',
      color: 'accent',
    },
    {
      title: 'Dislike',
      icon: 'thumb_down',
      text: 'Ezzel az ikonnal fejezheted ki a nemtetszésedet.',
      color: 'highlight',
    },

    {
      title: 'Rendezés',
      icon: 'swap_vert',
      text: 'Ezen ikon segítségével tudod megfordítani az aktuális projektekhez tartozó üzenetek sorrendjét ',
      color: 'accent',
    },
  ];

  getComponentVariables(): string[] {
    return Object.keys(this);
  }
}
