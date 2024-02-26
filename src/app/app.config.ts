import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
   importProvidersFrom(HttpClientModule),
   importProvidersFrom([
    provideFirebaseApp(()=> initializeApp({
      apiKey: "AIzaSyAoGECwD0M_ggNaJd5sZ18I78VIauIHud8",
      authDomain: "llantera-de-occidente.firebaseapp.com",
      projectId: "llantera-de-occidente",
      storageBucket: "llantera-de-occidente.appspot.com",
      messagingSenderId: "371369532883",
      appId: "1:371369532883:web:e23748dc165481d518e326",
      measurementId: "G-ZXT2MFR0PK"
    })),
    provideFirestore(() => getFirestore()),
   ])
  ]
};
