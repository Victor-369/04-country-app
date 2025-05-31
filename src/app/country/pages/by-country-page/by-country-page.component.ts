import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountrySearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);  // Inicia la señal con algún tipo de proceso, luego se convierte en una señal común

  // Versión actual con rxResource
  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if(!request.query) return of([]); // of: es un observable que devuelve lo que mandes a invocar entre paréntesis

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          // Se puede indicar tantos query parameters como se desee
          query: request.query,
          // hola: 'mundo',
          // saludos: 'Fernando'
        }
      });

      return this.countryService.searchByCountry(request.query)  // Observable
    },
  });
}