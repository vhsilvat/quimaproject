import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {HttpProviderService} from "../Service/http-provider.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  addProductForm: ProductAddForm = new ProductAddForm();

  @ViewChild("ProductAddForm")
  ProductAddForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  AddProduct(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.addProduct(this.addProductForm).subscribe(async data => {
          if (data != null && data.body != null && data.status == 200) {
            this.toastr.success(data.statusText);
            setTimeout(() => {
              this.router.navigate(['/Home']);
            }, 500);
          }
        },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

}

export class ProductAddForm {
  name: string = "";
  price: number = 0;
  description: string = "";
  available: boolean = false;
  category: Category =  new Category();
}

export class Category {
  name: string = "";
  constructor(name?: string) {
    this.name = name || '';
  }
}
