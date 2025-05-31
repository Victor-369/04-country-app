// Se escribe "type" porque son interfaces
import type { RESTCountry } from './../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';

export class CountryMapper {
  // static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      // Si no encuentra el nombre en castellano mostrará el texto por defecto "No Spanish name"
      name: restCountry.translations['spa'].common ?? 'No Spanish name',
      // Si tiene más de una capital se unen (join) por una coma. Esto es así porque podría devolver un array. SI no tiene capital (?), no hará el join
      capital: restCountry.capital?.join(','),
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
  };

  // static RestCountry[] => Country[]
  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map((country) => this.mapRestCountryToCountry(country));
  };
}
