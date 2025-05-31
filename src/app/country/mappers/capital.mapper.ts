// Se escribe "type" porque son interfaces
import type { RESTCapital } from '../interfaces/rest-capital.interface';
import type { Capital } from '../interfaces/capital.interface';


export class CapitalMapper {
  // static RestCapital => Capital
  static mapRestCapitalToCapital(restCapital: RESTCapital): Capital {
    return {
      cca2: restCapital.cca2,
      flag: restCapital.flag,
      flagSvg: restCapital.flags.svg,
      // Si no encuentra el nombre en castellano mostrará el texto por defecto "No Spanish name"
      name: restCapital.translations['spa'].common ?? 'No Spanish name',
      // Si tiene más de una capital se unen (join) por una coma. Esto es así porque podría devolver un array
      capital: restCapital.capital.join(','),
      population: restCapital.population,
    };
  };

  // static RestCapital[] => Capital[]
  static mapRestCapitalArrayToCapitalArray(restCapital: RESTCapital[]): Capital[] {
    return restCapital.map((capital) => this.mapRestCapitalToCapital(capital));
  };
}
