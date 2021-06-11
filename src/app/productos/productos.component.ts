import { ProductResponse } from './../services/products/product_response-interface';
import { UserService } from './../services/user/user.service';
import { ProductsService } from './../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  constructor(private userService: UserService, private productService: ProductsService, private router: Router, private route: ActivatedRoute) { }
  public products:ProductResponse[] = [];
  ngOnInit(): void {
    if(this.userService.getSessionToken() != null){
      this.productService.getProducts(this.userService.getSessionToken()!).subscribe((data: [ProductResponse]) => {
        //alert("Session iniciada: "+data.access_token)
        console.log(data);
        this.products = data;
      });
    }
  }
  select(item: number){
    this.router.navigate(["/productos/detalles/"+item])
    alert("Agregado al carrito");
  }
}
