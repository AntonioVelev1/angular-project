import { CanActivateChild, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { map, tap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/interfaces/user';

@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let stream$: Observable<IUser | null>;
        if (this.userService.currentUser === undefined) {
            stream$ = this.userService.profile();
        } else {
            stream$ = of(this.userService.currentUser);
        }

        
        return stream$.pipe(
            map((user) => {
                const isLoggedFromData = childRoute.data.isLogged;
                return typeof isLoggedFromData !== 'boolean' || isLoggedFromData === !!user;
            }),
            tap((canContinue) => {
                if (canContinue) { return; }
                const url = this.router.url;
                this.router.navigateByUrl(url);
            }),
            
        );

    }

}