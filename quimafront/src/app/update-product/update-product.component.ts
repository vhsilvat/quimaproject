import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpProviderService } from "../Service/http-provider.service";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm: ProductForm = new ProductForm();

  @ViewChild("ProductForm")
  ProductForm!: NgForm;

  isSubmitted: boolean = false;
  productId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
              private httpProvider: HttpProviderService) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProductDetailById();
  }

  getProductDetailById() {
    this.httpProvider.getProductById(this.productId).subscribe((data: any) => {
        if (data != null && data.body != null) {
          this.updateProductForm.name = data.body.name;
          this.updateProductForm.description = data.body.description;
          this.updateProductForm.price = data.body.price;
          this.updateProductForm.category = new Category();
          this.updateProductForm.category.name = data.body.category.name;
          this.updateProductForm.available = data.body.available;
        }
      },
      (error: any) => { });
  }

  UpdateProduct(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.updateProduct(this.updateProductForm, this.productId).subscribe(async data => {
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

export class ProductForm {
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
