import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from "./add-product/add-product.component";
import { DeletProductComponent } from "./delet-product/delet-product.component";
import { UpdateProductComponent } from "./update-product/update-product.component";
import { GetAllProductsComponent  } from "./get-all-products/get-all-products.component";
import { GetProductComponent } from "./get-product/get-product.component";
import { GetProductByCategoryComponent } from "./get-product-by-category/get-product-by-category.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'GetAllProducts', component: GetAllProductsComponent },
  { path: 'GetProduct/:id', component: GetProductComponent },
  { path: 'GetProductByCategory/:category', component: GetProductByCategoryComponent },
  { path: 'AddProduct', component: AddProductComponent },
  { path: 'UpdateProduct/:id', component: UpdateProductComponent },
  { path: 'DeleteProduct/:id', component: DeletProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
