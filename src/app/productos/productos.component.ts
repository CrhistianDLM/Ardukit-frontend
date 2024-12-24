import { DialogOverviewComponent } from './../dialog-overview/dialog-overview.component';
import { MatDialog } from '@angular/material/dialog';
import { CarritoService } from './../services/carrito/carrito.service';
import { ProductResponse } from './../services/products/product_response-interface';
import { UserService } from './../services/user/user.service';
import { ProductsService } from './../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public baseProduct:ProductResponse[] = [];
  public products:ProductResponse[] = [];
  public search: string;

  constructor(private userService: UserService, private productService: ProductsService, private router: Router, private route: ActivatedRoute, public cart: CarritoService, public dialog: MatDialog) {
    this.search = "";
  }
  ngOnInit(): void {
    if(this.userService.getSessionToken() != null){
      this.productService.getProducts(this.userService.getSessionToken()!).subscribe((data: [ProductResponse]) => {
        //alert("Session iniciada: "+data.access_token)
        console.log(data);
        this.products = data;
        this.baseProduct = data;
      });
    }
  }
  select(item: ProductResponse){
    this.cart.agregarCarrito(item);
    this.openDialog(item);

  }
  filterBy(){
    this.products = this.baseProduct.filter(x => x.name.indexOf(this.search) > -1);
  }
  openDialog(item: ProductResponse): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: {title: "Added to cart", message: "Product added to the cart"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result == DialogOverviewComponent.BACK_ACTION){
        return;
      }

      if(this.userService.getRole() == UserService.PARTNER){
        this.router.navigate(["/productos/detalles/"+item.id]);
        return;
      }
      this.router.navigate(["/cart"]);

    });
  }
}
