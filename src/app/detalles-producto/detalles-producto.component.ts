import { ProductResponse } from './../services/products/product_response-interface';
import { UserService } from './../services/user/user.service';
import { ProductsService } from './../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss']
})
export class DetallesProductoComponent implements OnInit {
  public product: ProductResponse = {
    id: 0,
    name: "",
    description: "",
    short_description: "",
    image: "",
    weight: 0,
    price: 0,
    stocks: 0,
    category_id: 0,
    created_at: "",
    updated_at: "",
  };
  constructor(private route: ActivatedRoute, public productS: ProductsService, public user: UserService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("producto id: "+ id, id)
    this.productS.getProduct(this.user.getSessionToken()!, id as string).subscribe((data : ProductResponse) => {
      this.product = data;
    });
  }

}
