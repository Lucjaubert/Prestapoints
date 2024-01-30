import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/auth/authentication.service';
import { RoleEnum } from 'src/app/shared/enum/role.enum';
import { AlertEnum } from 'src/app/shared/enum/alert.enum';
import { AlertService } from 'src/app/shared/services/alert.service';


@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authenticationService.getRoles().includes(RoleEnum.ADMIN)) {
      this.alertService.setAlert(
        AlertEnum.TYPE_DANGER,
        AlertEnum.MESSAGE_WRONG_ROLE,
        AlertEnum.TIME_MEDIUM
      );
      return false;
    }

    return true;
  }
}
