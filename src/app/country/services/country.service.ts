import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError, of, tap } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();



  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    const url = `${API_URL}/capital/${query}`;

    if(this.queryCacheCapital.has(query)) {
      return of( this.queryCacheCapital.get(query) ?? [] );
    }

    // Se indica <RESTCountry[]> para "forzar" el tipo de dato a un array de RESTCountry y así evitar que sea un "object" por defecto.
    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries) => this.queryCacheCapital.set(query, countries)), // Almacena el resultado en la variable que hará de caché
        catchError(error => {
          return throwError(
            () => new Error(`No se pudo obtener países con ese query: ${query}`)
          );
        }),
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    const url = `${API_URL}/name/${query}`;

    if(this.queryCacheCountry.has(query)) {
      return of( this.queryCacheCountry.get(query) ?? [] );
    }

    // Se indica <RESTCountry[]> para "forzar" el tipo de dato a un array de RESTCountry y así evitar que sea un "object" por defecto.
    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries) => this.queryCacheCountry.set(query, countries)), // Almacena el resultado en la variable que hará de caché
        catchError(error => {
          return throwError(
            () => new Error(`No se pudo obtener países con ese query: ${query}`)
          );
        }),
      );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;

    if(this.queryCacheRegion.has(region)) {
      return of( this.queryCacheRegion.get(region) ?? [] );
    }

    // Se indica <RESTCountry[]> para "forzar" el tipo de dato a un array de RESTCountry y así evitar que sea un "object" por defecto.
    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap((countries) => this.queryCacheRegion.set(region, countries)), // Almacena el resultado en la variable que hará de caché
        catchError(error => {
          return throwError(
            () => new Error(`No se pudo obtener países con ese query: ${region}`)
          );
        }),
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        map(countries => countries.at(0)), // Devuelve la primera posición del array
        catchError(error => {
          return throwError(
            () => new Error(`No se pudo obtener países con el código: ${code}`)
          );
        }),
      );
  }
}