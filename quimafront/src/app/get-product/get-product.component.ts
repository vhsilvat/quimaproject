import { Component, OnInit } from '@angular/core';
import { WebApiService } from "../Service/web-api.service";
import { ActivatedRoute } from "@angular/router";
import { HttpProviderService } from "../Service/http-provider.service";

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.scss']
})
export class GetProductComponent implements OnInit {

  productId: any;
  productDetail: any;

  constructor(public webApiService: WebApiService,
              private route: ActivatedRoute,
              private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProductById();
  }

  getProductById() {
    this.httpProvider.getProductById(this.productId).subscribe((data : any) => {
        if (data != null && data.body != null) {
          this.productDetail = data.body;
        }
      },
      (error :any)=> { });
  }

}
