import * as productActions from '../state/product.action';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];

    // Used to highlight the selected product in the list
    selectedProduct: Product | null;
  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(currentProduct => this.selectedProduct = currentProduct);

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    // TODO: unsubscription
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(showProductCode => this.displayCode = showProductCode);
  }

  ngOnDestroy() {
  }
  checkChanged(value: boolean) {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }
  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
