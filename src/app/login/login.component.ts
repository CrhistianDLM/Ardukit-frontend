import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { AKForm } from '../services/user/login-interface';
import { MatSliderModule } from '@angular/material/slider';

import {UserService} from '../services/user/user.service'
import { LoginResponse } from '../services/user/login_response-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public form: AKForm = {
    email: "", password: ""
  };
  constructor(private route: ActivatedRoute, private router: Router, private service: UserService) { }

  ngOnInit(): void {
  }
  login(e: any){
    e.preventDefault();
    console.log(this.form)
    this.service.login(this.form).subscribe((data: LoginResponse) => {
      //alert("Session iniciada: "+data.access_token)
      localStorage.setItem("session_info", JSON.stringify(data));
      this.nextView();
    })
  }
  nextView(){
    console.log(this.service.redirectUrl)
    this.router.navigate([this.service.redirectUrl]);
  }
}
