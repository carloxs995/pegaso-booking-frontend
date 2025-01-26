import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { environment } from 'environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { getAuth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
    apiKey: environment.firebaseConfig.apiKey,
    projectId: environment.firebaseConfig.projectId,
    appId: environment.firebaseConfig.appId,
    storageBucket: 'pegaso-booking.firebasestorage.app'
};

initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimations(),
        importProvidersFrom(
            JwtModule.forRoot({
                config: {
                    tokenGetter: () => {
                        const auth = getAuth();
                        if (auth.currentUser) {
                            return auth.currentUser.getIdToken();
                        }

                        return null;
                    },
                    allowedDomains: ['us-central1-pegaso-booking.cloudfunctions.net'],
                    disallowedRoutes: [],
                },
            })
        ),
        provideHttpClient(withInterceptorsFromDi())
    ]
};
