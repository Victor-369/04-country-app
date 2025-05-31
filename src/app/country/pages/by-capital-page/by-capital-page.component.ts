import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CountrySearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {
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

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          // Se puede indicar tantos query parameters como se desee
          query: request.query,
          // hola: 'mundo',
          // saludos: 'Fernando'
        }
      });

      return this.countryService.searchByCapital(request.query)  // Observable
    },
  });
}
