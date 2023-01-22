import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private acc: AccountService, private _snackBar: MatSnackBar) {

  }
  canActivate(): Observable<boolean | any> {
    return this.acc.currentUser$.pipe(
      map(user => {
        if (user) return true
        else {
          this._snackBar.open("Shall not pass :(", 'Close', {
            duration: 3000
          })
          return
        }
      })
    )
  }

}
