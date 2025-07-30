import { Observable } from 'rxjs';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class VillainsComponent implements CanComponentDeactivate { ...
//

export interface CanComponentDeactivate {
  podeDesativar: () => Observable<boolean> | Promise<boolean> | boolean;
}
