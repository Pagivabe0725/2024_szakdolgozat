import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom([
      AngularFireModule.initializeApp({
        projectId: 'szakdolgozat-kovacs-patrik',
          appId: '1:201169912540:web:1a8bba862b39c2b6aaea19',
          storageBucket: 'szakdolgozat-kovacs-patrik.firebasestorage.app',
          apiKey: 'AIzaSyAVr230S4iayQeQ1WXZF9BImMGKP2lxQeI',
          authDomain: 'szakdolgozat-kovacs-patrik.firebaseapp.com',
          messagingSenderId: '201169912540',
          measurementId: 'G-WW405JM269',
      }),
      AngularFireAuthModule,
      AngularFirestoreModule,
    ]),],

 
};
