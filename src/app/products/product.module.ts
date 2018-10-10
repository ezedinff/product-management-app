import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/product.reducer';
import { SharedModule } from '../shared/shared.module';
const productRoutes: Routes = [
  { path: '', component: ProductShellComponent }
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', reducer)
  ],
  declarations: [
    ProductEditComponent,
    ProductListComponent,
    ProductShellComponent
  ]
})
export class ProductModule { }
