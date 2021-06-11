import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { ProductResponse } from './product_response-interface';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private host: string = 'http://localhost:8090/api/products';

  constructor(private http: HttpClient) { }
  getProducts(token: string): Observable<[ProductResponse]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.get<[ProductResponse]>(this.host, httpOptions);
  }
  deleteProducto(token: string, id: number){

  }
}
