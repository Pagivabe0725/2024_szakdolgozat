import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { LoginComponent } from './public/components/login/login.component';
import { SignUpComponent } from './public/components/sign-up/sign-up.component';
import { MainComponent } from './private/components/main/main.component';
import { ForumComponent } from './private/components/forum/forum.component';
import { WorkshopComponent } from './private/components/workshop/workshop.component';
import { OwnComponent } from './private/components/own/own.component';
import { AddforumComponent } from './private/components/forum/addforum/addforum.component';
import { ForumElementInfoComponent } from './private/components/forum/forum-element-info/forum-element-info.component';
import { WorksComponent } from './private/components/workshop/works/works.component';
import { TimelineComponent } from './private/components/workshop/timeline/timeline.component';
import { WorkCreatorComponent } from './private/components/workshop/work-creator/work-creator.component';
import { MessageCommentComponent } from './private/components/workshop/message-comment/message-comment.component';
import { AccountComponent } from './private/components/account/account.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'public',

    component: PublicComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'login',
      },
      {
        path: 'registration',
        component: SignUpComponent,
        title: 'registration',
      },
    ],
  },
  {
    path: 'private',
    component: PrivateComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        component: MainComponent,
        title: 'main page',
      },
      {
        path: 'forum',
        component: ForumComponent,
        title: 'forum',
      },
      {
        path: 'forum/:forumId',
        component: ForumElementInfoComponent,
        title: 'chosen Forum',
      },
      {
        path: 'addForum',
        component: AddforumComponent,
        title: 'addForum',
      },

      {
        path: 'message/:workId',
        component: MessageCommentComponent,
        title: 'message',
      },
      {
        path: 'message-comment/:workId',
        component: MessageCommentComponent,
        title: 'message-comment',
      },

      {
        path: 'my-account',
        component: AccountComponent,
        title: 'my-account',
      },
      {
        path: 'workshop',
        component: WorkshopComponent,
        title: 'workshop',
        children: [
          {
            path: '',
            redirectTo: 'works',
            pathMatch: 'full',
          },
          {
            path: 'works',
            children: [
              { path: '', redirectTo: 'all', pathMatch: 'full' },
              { path: 'all', title: 'all works', component: WorksComponent },
              { path: 'my', title: 'my works', component: WorksComponent },
            ],
          },
          {
            path: 'workcreator',
            component: WorkCreatorComponent,
            title: 'Work creator',
          },
          {
            path: ':workId',
            component: TimelineComponent,
            title: 'chosen work',
          },
        ],
      },
      {
        path: 'own',
        component: OwnComponent,
        title: 'own',
      },
    ],
  },
];
