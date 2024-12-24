import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from './../dialog-overview/dialog-overview.component';
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
  constructor(public userService: UserService, private catService: CategoriesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.userService.getSessionToken() != null){
      console.log(this.userService.getRole(), UserService.CLIENT);
      this.isEditable = this.userService.getRole() >= UserService.CLIENT;
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
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: {title: "Added to cart", message: "Product added to the cart", type: "dialog"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result == DialogOverviewComponent.BACK_ACTION){
        return;
      }
      console.log(result);



    });
  }
}
