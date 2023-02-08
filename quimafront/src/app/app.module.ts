import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, NgModalConfirm } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { GetProductComponent } from './get-product/get-product.component';
import { GetAllProductsComponent } from './get-all-products/get-all-products.component';
import { DeletProductComponent } from './delet-product/delet-product.component';
import { GetProductByCategoryComponent } from './get-product-by-category/get-product-by-category.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    UpdateProductComponent,
    GetProductComponent,
    GetAllProductsComponent,
    DeletProductComponent,
    GetProductByCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [NgModalConfirm],
  bootstrap: [AppComponent]
})
export class AppModule { }
