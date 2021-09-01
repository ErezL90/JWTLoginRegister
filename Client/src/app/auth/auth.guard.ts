import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService:UserService, private router:Router){}

  // CanActivate Guard
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.userService.isLoggedIn()){
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
        return false;
      }
    return true;
  }

}
