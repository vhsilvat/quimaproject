import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeResult = '';
  productList: any = [];
  constructor(private router: Router, private modalService: NgbModal,
              private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  async getAllProducts() {
    this.httpProvider.getAllProducts().subscribe((data : any) => {
        if (data != null && data.body != null) {
          let resultData = data.body;
          if (resultData) {
            this.productList = resultData;
          }
        }
      },
      (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.productList = [];
            }
          }
        }
      });
  }

  AddProduct() {
    this.router.navigate(['AddProduct']);
  }

  deleteProductConfirmation(product: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteProduct(product);
      },
      (reason) => {});
  }

  deleteProduct(product: any) {
    this.httpProvider.deleteProduct(product.id).subscribe((data : any) => {
        if (data != null && data.status == 200) {
          this.toastr.success(data.statusText);
          setTimeout(() => {
            this.ngOnInit();
          }, 500);
        }
      },
      (error : any) => {});
  }
}
