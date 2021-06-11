import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { CategoriesService } from './../services/categories/categories.service';
import { CategoryResponse } from './../services/categories/category_response-interface';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  public categories: CategoryResponse[] = [];
  public isEditable: Boolean = true;
  constructor(public userService: UserService, private catService: CategoriesService) { }

  ngOnInit(): void {
    if(this.userService.getSessionToken() != null){
      this.isEditable = this.userService.getRole() > UserService.CLIENT;
      this.catService.getCategories(this.userService.getSessionToken()!).subscribe((data: [CategoryResponse]) => {
        //alert("Session iniciada: "+data.access_token)
        console.log(data);
        this.categories = data;
      });
    }
  }

  editCategory(id: number){
    console.log("editar: "+id);
  }
  deleteCategory(id: number){
    console.log("eliminar: "+id);
  }

}
