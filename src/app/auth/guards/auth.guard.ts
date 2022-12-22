import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.authService.verificaAutenticacion()
      .pipe(
        tap(estadoAuth => {
          if (!estadoAuth) {
            this.router.navigate(['./auth/login'])
          }
        })
      );
  }

  public canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

    return this.authService.verificaAutenticacion()
      .pipe(
        tap(estadoAuth => {
          if (!estadoAuth) {
            this.router.navigate(['./auth/login'])
          }
        })
      );
  }



}
