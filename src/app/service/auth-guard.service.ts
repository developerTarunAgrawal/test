import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  get CheckLoginStatus() {
    if (sessionStorage.getItem('isUserLoggedIn')) {
      return true;
    } else {
      return false;
    }

  }
  canActivate() {
    if (this.CheckLoginStatus) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
