import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/app/shared/enum/role.enum';
import { AuthenticationService } from '../service/auth/authentication.service';

import { AlertEnum } from 'src/app/shared/enum/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authenticationService.getRoles().includes(RoleEnum.USER)) {
      
      this.alertService.setAlert(
        AlertEnum.TYPE_DANGER,
        AlertEnum.MESSAGE_NOT_CONNECTED,
        AlertEnum.TIME_MEDIUM
      );
      this.router.navigate(["/auth"]);
      return false;
    } 

    return true;
  }
}
