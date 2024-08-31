import { Component, EventEmitter, OnInit} from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { total } from '../../store/items.actions';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{


  items: CartItem[] = [];
  
  total = 0;


  constructor(
    private store: Store<{items: ItemsState}>, 
    private sharingDataService: SharingDataService, private router: Router){

      this.store.select('items').subscribe(state => {
        this.items = state.items;
        this.total = state.total;
      })
    

  }
  ngOnInit(): void {
    this.store.dispatch(total());
  }

  onDeleteCart(id: number){
    this.sharingDataService.idProductEventEmitter.emit(id);
  }


}
