import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { CategoryResponse } from './category_response-interface';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private host: string = environment.apiUrl+'/api/category';

  constructor(private http: HttpClient) { }
  getCategories(token: string): Observable<[CategoryResponse]>{
    document.cookie = environment.cookieKey;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,

      })
    };
    return this.http.get<[CategoryResponse]>(this.host, httpOptions);
  }
  addCategory(token: string, name: String, description: string){
    document.cookie = environment.cookieKey;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,

      })
    };
    return this.http.post<[CategoryResponse]>(this.host, {
      name,
      description
    },httpOptions);
  }
  changeCategory(token: string, id: number){

  }
  deleteCategory(){

  }
}
