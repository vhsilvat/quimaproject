import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

let apiUrl = "http://127.0.0.0:8080/";

let httpLink = {
  getAllProducts: apiUrl + "api/products",
  getProductsByCategory: apiUrl + "api/products/category/",
  getProductById: apiUrl + "api/products/",
  addProduct: apiUrl + "api/products",
  updateProduct: apiUrl + "api/products/",
  deleteProduct: apiUrl + "api/products/"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllProducts(): Observable<any> {
    return this.webApiService.get(httpLink.getAllProducts);
  }
  public getProductsByCategory(category: any): Observable<any> {
    return this.webApiService.get(httpLink.getProductsByCategory + category);
  }
  public getProductById(id: any): Observable<any> {
    return this.webApiService.get(httpLink.getProductById + id);
  }
  public addProduct(product: any): Observable<any> {
    return this.webApiService.post(httpLink.addProduct, product);
  }
  public updateProduct(product: any, id: any): Observable<any> {
    return this.webApiService.put(httpLink.updateProduct + id , product);
  }
  public deleteProduct(id: any): Observable<any> {
    return this.webApiService.delete(httpLink.deleteProduct + id)
  }
}
