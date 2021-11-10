import { ProductResponse } from './../products/product_response-interface';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carrito: ProductResponse[];
  constructor() {
    this.carrito = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [];
  }
  agregarCarrito(item: ProductResponse){
    this.carrito.push(item);
    localStorage.setItem("cart", JSON.stringify(this.carrito));

  }
  eliminarItem(index: number){
    this.carrito.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(this.carrito));
  }
  darTodos(token: string): ProductResponse[]{
    return this.carrito;
  }
  vaciarCarrito(){
    this.carrito.splice(0, this.carrito.length);
    localStorage.setItem("cart", JSON.stringify(this.carrito));
  }
}
