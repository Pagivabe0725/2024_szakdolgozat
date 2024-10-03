import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';
import { LoginComponent } from './public/components/login/login.component';
import { SignUpComponent } from './public/components/sign-up/sign-up.component';
import { MainComponent } from './private/components/main/main.component';

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
    children:[
      {
        path:'',
        redirectTo:'main',
        pathMatch:'full'
      },
      {
        path:'main',
        component:MainComponent,
        title:'main page'
      }
    ]
  },
];
