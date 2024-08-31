import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { state } from '@angular/animations';
import { load } from '../../store/products.actions';

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {

  products!: Product[];


  constructor(
    private store: Store<{ products: any }>,
     private sharingDataService: SharingDataService) {
    this.store.select('products').subscribe(state => this.products = state.products)
  }

  ngOnInit(): void {
    this.store.dispatch(load());
  }


  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);

  }


}
