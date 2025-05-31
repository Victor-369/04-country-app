import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // proveer la interpretación nativa del Fetch API. También evita el error al inyectar "inject(HttpClient)" en country.service.ts
    provideHttpClient(withFetch()),
  ]
};
