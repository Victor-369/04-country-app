import { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layouts/CountryLayout/CountryLayout.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';


export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent,
      },
      {
        path: 'by-region',
        component: ByRegionPageComponent,
      },
      {
        // Ruta dinámica
        path: 'by/:code',
        component: CountryPageComponent,
      },
      {
        // Evita que la ruta /coutry/ quede vacía, por lo tanto cargará /country/by-capital por defecto
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];

// Con este export no será necesario hacer una llamada a "then" en app.routes.ts al cargar las rutas de country.
export default countryRoutes;
