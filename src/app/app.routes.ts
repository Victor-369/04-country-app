import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    // No se hace "lazy load" a este componente porque cualquier persona va a ver este componente
    path: '',
    component: HomePageComponent,
  },
  {
    // Carga las rutas de los países de manera perezosa, llamando a otro fichero de rutas (country.routes.ts).
    // Al importar este módulo tomará por defecto la ruta de los países ubicado en "country.routes.ts".
    path: 'country',
    loadChildren: () => import('./country/country.routes'), //.then(modulo => modulo.countryRoutes),
  },
  {
    // Redirecciona a HomePageComponent
    path: '**',
    redirectTo: '',
  }
];
