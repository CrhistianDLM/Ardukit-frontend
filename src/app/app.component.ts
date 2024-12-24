import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ardukit-frontend';
  loggued: boolean = false;
  constructor(public userService: UserService, public router: Router) {
    this.loggued = this.userService.isLoggedIn();
  }
  logOut(){
    this.userService.logOut();
    alert("Session finalizada");
    this.router.navigateByUrl("login");
  }
}
