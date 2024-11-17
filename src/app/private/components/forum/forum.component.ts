import { Component, OnInit } from '@angular/core';
import { LeftsideConsoleComponent } from './leftside-console/leftside-console.component';
import { CardElementComponent } from './card-element/card-element.component';
import { forum } from '../../../shared/interfaces/forum';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeInAnimations } from '../../../shared/animations/fadeIn.animation';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    LeftsideConsoleComponent,
    CardElementComponent,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss',
  animations: [
    trigger('forumElementsAnimation', [
      transition('* <=> *', [useAnimation(fadeInAnimations)], {}),
    ]),
  ],
})
export class ForumComponent implements OnInit {
  public forumObjectArray: Array<forum> = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.forumObjectArray = [
        {
          id: '4',
          title: 'els3ő valami',
          text: 'Egyszer a nyulacska elment az erdőbe virágot szedni',
          author: 'Vilibácsi',
        },
        {
          id: '2',
          title: 'második valami',
          text: 'asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsdasjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsdasjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd',
          author: 'Vilibácsi',
        },
        {
          id: '2',
          title: 'második valami',
          text: 'asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsdasjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsdasjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd',
          author: 'Vilibácsi',
        },
        {
          id: '2',
          title: 'második valami',
          text: 'asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsdasjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsdasjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd asjhabsdhabsdkabskdjaskjdnakjsb aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd aksjdbnkajsnd akjsbdkjasbnd asdabsd',
          author: 'Vilibácsi',
        },
      ];
    }, 100);
  }
}
