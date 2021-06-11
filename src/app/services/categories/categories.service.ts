import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { CategoryResponse } from './category_response-interface';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private host: string = 'http://localhost:8090/api/category';

  constructor(private http: HttpClient) { }
  getCategories(token: string): Observable<[CategoryResponse]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    return this.http.get<[CategoryResponse]>(this.host, httpOptions);
  }
  addCategory(){

  }
}
