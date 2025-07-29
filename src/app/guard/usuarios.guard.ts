import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log(route);
    console.log(state);
    if (this.authService.usuarioEstaLogado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
