import { environment } from './../../../environments/environment';
import { NewSessionToken } from './refresh_token-interface';
import { AKRegisterForm } from './register-interfase';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
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
  private host: string = environment.apiUrl+'/api/login';
  private linkRegister: string = environment.apiUrl+'/api/register';
  private linkRefreshSessionToken: string = environment.apiUrl+'/api/refresh';

  constructor(private http: HttpClient) { }

  login(params: AKForm): Observable<LoginResponse>{
    document.cookie = environment.cookieKey;
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this.http.post<LoginResponse>(this.host, params,httpOptions);
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
  isExpired(): Boolean{
    const session = localStorage.getItem("session_info");
    if(session){
      const data: LoginResponse = JSON.parse(session);
      return (new Date(data.expires_in)).getTime() < (new Date()).getTime();
    }
    return true;
  }
  getSessionToken(): string|null{
    const session = localStorage.getItem("session_info");
    if(session){
      const data: LoginResponse = JSON.parse(session);
      return `${data.token_type} ${data.access_token}`;
    }
    return null;
  }
  logOut(){
    localStorage.removeItem("session_info");

  }
  refresh(token: string){
    document.cookie = environment.cookieKey;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer" + token,

      })
    };
    return this.http.post<LoginResponse>(this.linkRefreshSessionToken, {}, httpOptions);
  }
  register(params: AKRegisterForm): Observable<LoginResponse>{
    document.cookie = environment.cookieKey;
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };
    return this.http.post<LoginResponse>(this.linkRegister, params, httpOptions);
  }
}
