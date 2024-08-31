import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ItemsState } from '../../store/items.reducer';
import { Store } from '@ngrx/store';
import { add, remove, total } from '../../store/items.actions';

//COMPONENTE PRINCIPAL
@Component({
  selector: 'cart-app',
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];


  constructor(
    private store: Store<{items: ItemsState}>,
    private router: Router,
    private sharingDataService: SharingDataService,) {
      this.store.select('items').subscribe(state =>{
        this.items = state.items;
        this.saveSession();
        console.log('Cambio el estado')
      })
    }
  ngOnInit(): void {
    this.onDeleteCart();
    this.onAddCart();

  }

  onAddCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {

      this.store.dispatch(add({product}));
      this.store.dispatch(total());

      // this.router.navigate(['/cart']);
      
      Swal.fire({
        title: "Shopping Car",
        text: "Se ha agregado un nuevo producto",
        icon: "success"
      })
    });

  }

  //EL EVENTO NO SE EJECUTA, SE QUEDA ESCUCHANDO EL ID, HASTA QUE LO PASEN SE EJECUTA
  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      console.log(id + ' Se ha ejecutado del evento idProductEventEmitter')

      Swal.fire({
        title: "Are you sure than you want to del this product?",
        text: "Esta accion es irreversible y no se puede cancelar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.store.dispatch(remove({id}));
          this.store.dispatch(total());

          //REFRESCA LA PAGINA Y TE REDIRIGE A LA MISMA PAGINA
            this.router.navigate(['cart']);
            
          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado del producto del carro de compras.",
            icon: "success"
          });
        }
      });

    })
  }
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
