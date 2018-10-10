import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { CoreComponent } from '../core.component';
import { HomeComponent } from '../../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
const appRouting: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'products', loadChildren: '../../products/product.module#ProductModule'},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRouting)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
