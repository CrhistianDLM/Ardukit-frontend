import { OrdersService } from './../services/orders/orders.service';
import { UserService } from './../services/user/user.service';
import { CarritoService } from './../services/carrito/carrito.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  public carrito: any[];
  constructor(public cartService:CarritoService, public userService: UserService, public orderService: OrdersService) {
    this.carrito = [];
    if(userService.isLoggedIn()){
      this.carrito = cartService.darTodos(userService.getSessionToken() as string);
      console.log(this.carrito)
      this.orderService.token = userService.getSessionToken() as string;
    }
  }

  ngOnInit(): void {
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    console.log("ngAfterContentChecked");
  }

  removeItem(index: number){
    this.cartService.eliminarItem(index);
    this.carrito = this.cartService.darTodos(this.userService.getSessionToken() as string);
  }
  getCount(){
    return this.carrito.reduce((acc,item) => acc + (+item.price), 0);
  }
  generateOrder(){
    this.orderService.createOrder(this.carrito).subscribe((s: any) => {
      if(s.id){
        this.cartService.vaciarCarrito();
        this.carrito = [];
        alert("Orden registrada con exito");
        return;
      }
      alert("No se pudo registrar la orden. Contacte con el desarrollador backend");
    });
  }
}
