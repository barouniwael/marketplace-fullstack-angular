import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";

import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthguardGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) {}
  canActivate() {
    if (localStorage.getItem("userId")) {
      return true;
    } else {
      this.router.navigate([""]);
      return false;
    }
  }
}
