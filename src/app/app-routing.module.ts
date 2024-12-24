import { NuevaCategoriaComponent } from './nueva-categoria/nueva-categoria.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticatedGuard } from './authenticated.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CarritoComponent } from './carrito/carrito.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthenticatedGuard],
  },
  {path: '', redirectTo:"/productos", pathMatch:"full" },
  {path: 'productos/detalles/:id', component: DetallesProductoComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cart', component: CarritoComponent},
  {path: 'nueva-categoria', component: NuevaCategoriaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
