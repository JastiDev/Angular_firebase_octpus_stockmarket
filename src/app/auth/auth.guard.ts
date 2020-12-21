import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.authService.user) {
            if (route.data && route.data.roles) {
                if (route.data.roles.includes(this.authService.user.role)) {
                    return true;
                } else {
                    this.router.navigate(["/unauthorized"]);
                    return false;
                }
            } else {
                return true;
            }
        } else {
            this.router.navigate(["/pages/auth/login"]);
            return false;
        }
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        console.log("AuthGuard : ", this.authService.user);
        if (this.authService.user) {
            if (route.data && route.data.roles) {
                if (route.data.roles.includes(this.authService.user.role)) {
                    return true;
                } else {
                    this.router.navigate(["/unauthorized"]);
                    return false;
                }
            } else {
                return true;
            }
        } else {
            this.router.navigate(["/pages/auth/login"]);
            return false;
        }
    }
}
