import { AuthenticatedGuard } from './authenticated.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthenticatedGuard],
    children:[
      {path: 'detalles/:id', component: DetallesProductoComponent}

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
