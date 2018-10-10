import { Product } from './product';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private products: Product[];
  private headers = new HttpHeaders({'content-type': 'application/json'});
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    if (this.products) {
      return of(this.products);
    }
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => this.products = data),
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<Product> {
    product.id = null;
    return this.http.post<Product>(this.productsUrl, product, {headers: this.headers})
                    .pipe(
                      tap(data => this.products.push(data)),
                      catchError(this.handleError)
                    );
  }


  updateProduct(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, {headers: this.headers})
                    .pipe(
                      tap(data => {
                        const foundIndex = this.products.findIndex(item => item.id === product.id);
                        if (foundIndex > -1) {
                          this.products[foundIndex] = product;
                        }
                      }),
                      map(() => product),
                      catchError(this.handleError)
                    );
  }

  deleteProduct(id: number): Observable<{}> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
                    .pipe(
                      tap(data => {
                        const foundIndex = this.products.findIndex(item => item.id === id);
                        if (foundIndex > -1) {
                          this.products.splice(foundIndex, 1);
                        }
                      }),
                      catchError(this.handleError)
                    );
  }
  handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
