import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { Store, select } from "@ngrx/store";

import * as fromProduct from "../state/product.reducer";
import * as ProductActions from "../state/product.actions";
import { takeWhile } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  errorMessage$: Observable<string>;
  componentActive = true;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.State>
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive)
      )
      .subscribe(currentProduct => (this.selectedProduct = currentProduct));

    this.store
      .pipe(
        select(fromProduct.getProducts),
        takeWhile(() => this.componentActive)
      )
      .subscribe(products => (this.products = products));

    this.store.dispatch(new ProductActions.Load());

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    // this.productService
    //   .getProducts()
    //   .subscribe(
    //     (products: Product[]) => (this.products = products),
    //     (err: any) => (this.errorMessage = err.error)
    //   );

    this.store
      .pipe(
        select(fromProduct.getShowProductCode),
        takeWhile(() => this.componentActive)
      )
      .subscribe(showProductCode => (this.displayCode = showProductCode));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.displayCode = value;
    this.store.dispatch(new ProductActions.ToggleProductCode(value));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new ProductActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new ProductActions.SetCurrentProduct(product));
  }
}
