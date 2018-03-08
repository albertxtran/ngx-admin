import { Injectable } from '@angular/core';
import { CanActivate, Router  } from '@angular/router';
import { GuardService } from './guard.service'
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private guardService: GuardService, private router: Router) {
  }

  canActivate() {
    return this.guardService.isAuthenticated()
      .pipe(
        tap( role => {
          if (!role) {
            this.router.navigate(['pages/dashboard']);
          }
        }),
      );
  }
}