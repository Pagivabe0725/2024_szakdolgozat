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
        apiKey: "AIzaSyARIZ0zi5Zyp3v4dQYUlbF_S9QGtlVp-50",
        authDomain: "web-projekt-fa8c1.firebaseapp.com",
        projectId: "web-projekt-fa8c1",
        storageBucket: "web-projekt-fa8c1.appspot.com",
        messagingSenderId: "641392570973",
        appId: "1:641392570973:web:b87723ded283cd540693b4",
        measurementId: "G-XRVT4K2P1R"
      }),
      AngularFireAuthModule,
      AngularFirestoreModule,
    ]),],
};
