import { AKRegisterForm } from './register-interfase';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AKForm } from './login-interface';
import { LoginResponse } from './login_response-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public redirectUrl: string = "/productos"
  public static readonly ADMIN = 1;
  public static readonly PARTNER = 2;
  public static readonly CLIENT = 3;
  private host: string = 'http://localhost:8090/api/login';
  private linkRegister: string = 'http://localhost:8090/api/register';

  constructor(private http: HttpClient) { }

  login(params: AKForm): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.host, params);
  }
  isLoggedIn(): boolean{
    const session = localStorage.getItem("session_info");
    return session != null && session.length > 0;
  }
  getRole(): number{
    const session = localStorage.getItem("session_info");
    if(session){
      const data: LoginResponse = JSON.parse(session);
      return data.role;
    }
    return UserService.CLIENT;
  }
  getSessionToken(): string|null{
    const session = localStorage.getItem("session_info");
    if(session){
      const data: LoginResponse = JSON.parse(session);
      return data.access_token;
    }
    return null;
  }
  logOut(){
    localStorage.removeItem("session_info");

  }

  register(params: AKRegisterForm): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.linkRegister, params);
  }
}
