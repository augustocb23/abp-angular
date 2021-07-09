import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderItemsComponent } from './order-items/order-items.component';


@NgModule({
  declarations: [OrderComponent, OrderItemsComponent],
  imports: [
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
