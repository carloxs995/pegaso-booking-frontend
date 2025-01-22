import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { environment } from 'environment';

const firebaseConfig: FirebaseOptions = {
    apiKey: environment.firebaseConfig.apiKey,
    projectId: environment.firebaseConfig.projectId,
    appId: environment.firebaseConfig.appId
};

initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        BrowserAnimationsModule
    ]
};
