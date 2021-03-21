import { AuthenticatedGuard } from './authenticated.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { CategoriasComponent } from './categorias/categorias.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthenticatedGuard],
  },
  {path: 'productos/detalles/:id', component: DetallesProductoComponent},
  {path: 'categorias', component: CategoriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
