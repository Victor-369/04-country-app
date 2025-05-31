import { CountryService } from './../../services/country.service';
import { Component, inject, linkedSignal} from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import type { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLocaleLowerCase();

  const validRegions: Record<string, Region> = {  // string: tipo entrada, Region: tipo salida
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
};


@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  CountryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region | null>(() =>
    validateQueryParam(this.queryParam)
  );

  countryResource = rxResource({
    request: () => ({region: this.selectedRegion()}),
    loader: ({request}) => {
      if(!request.region) return of([]); // of: es un observable que devuelve lo que mandes a invocar entre paréntesis

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          // Se puede indicar tantos query parameters como se desee
          region: request.region,
        },
      });

      return this.CountryService.searchByRegion(request.region)  // Observable
    },
  });
}
