import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private host: string = environment.apiUrl+'/api/orders';
  public token: string = "";
  constructor(private http: HttpClient) { }
  createOrder(items: any, description: string = ""): Observable<any>{
    const params = {
      type : 1,
      items : items,
      description : description
    }
    document.cookie = environment.cookieKey;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + this.token,

      })
    };
    return this.http.post<any>(this.host, params, httpOptions);
  }
}
