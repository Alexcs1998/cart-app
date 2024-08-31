import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartAppComponent } from './components/cart-app/cart-app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreModule, provideStore } from '@ngrx/store';
import { itemsReducer } from './store/items.reducer';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productsReducer } from './store/products.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effects';

@NgModule({
  declarations: [
    AppComponent,
    CartAppComponent,
    CatalogComponent,
    ProductCardComponent,
    CartComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([])
  ],
  providers: [provideStore(
    {
      items: itemsReducer,
      products: productsReducer
    }
  ), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  provideEffects(ProductsEffects)],
  bootstrap: [AppComponent]
})
export class AppModule { }
