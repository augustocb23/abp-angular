import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ListService } from '@abp/ng.core';

import { OrderItemDto, OrderService, ProductService } from '@proxy/orders';
import { getWithCache } from '../../shared/get-with-cache';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: ['.scroll-vertical { overflow-y: auto; height: 290px }'],
  providers: [ListService]
})
export class OrderItemsComponent implements OnInit {
  @Input() orderId: string;
  items: OrderItemDto[];
  isLoading: boolean;

  private productNames = new Map<string, Observable<string>>();

  constructor(private service: OrderService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getItemsById(this.orderId)
      .subscribe(items => {
        this.items = items;
        this.isLoading = false;
      });
  }

  getProductName(productId: string): Observable<string> {
    const fetchObservable = this.productService.get(productId)
      .pipe(map(product => product.name));
    return getWithCache(fetchObservable, this.productNames, productId);
  }
}
