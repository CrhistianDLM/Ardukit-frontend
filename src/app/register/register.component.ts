import { LoginResponse } from './../services/user/login_response-interface';
import { Router } from '@angular/router';
import { UserService } from './../services/user/user.service';
import { AKRegisterForm } from './../services/user/register-interfase';
import { Component, OnInit } from '@angular/core';
import { AKForm } from '../services/user/login-interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: AKRegisterForm = {
    name: "", email: "", password: "", repeat_password:""
  };
  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }
  register(e: any){
    if(!this.isValidated()){
      alert("Campos invalidos");
      return;
    }
    this.userService.register(this.form).subscribe((data: LoginResponse) => {
      //alert("Session iniciada: "+data.access_token)
      localStorage.setItem("session_info", JSON.stringify(data));
      this.login();

    });
  }
  login(){
    this.userService.login({email: this.form.email, password: this.form.password}).subscribe((data: LoginResponse) => {
      //alert("Session iniciada: "+data.access_token)
      localStorage.setItem("session_info", JSON.stringify(data));
      this.nextView();
    })
  }
  nextView(){
    console.log(this.userService.redirectUrl)
    this.router.navigate([this.userService.redirectUrl]);
  }

  isValidated(){
    if(this.form.email.length == 0){
      return false;
    }
    if(this.form.password.length == 0){
      return false;
    }
    if(this.form.repeat_password.length == 0){
      return false;
    }
    if(this.form.repeat_password !== this.form.password){
      return false;
    }
    return true;
  }
}
