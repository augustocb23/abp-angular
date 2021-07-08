import { Component, OnInit } from '@angular/core';

import { ListService, PagedResultDto } from '@abp/ng.core';

import { ClientService, OrderDto, OrderService } from '@proxy/orders';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [ListService]
})
export class OrderComponent implements OnInit {
  orders: PagedResultDto<OrderDto>;

  clientNames = new Map<string, Observable<string>>();

  constructor(public readonly list: ListService, private service: OrderService,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    const orderStreamCreator = (query) => this.service.getList(query);

    this.list.hookToQuery(orderStreamCreator)
      .subscribe((response) => {
        this.orders = response;
      });
  }

  getClientName(id: string): Observable<string> {
    const cachedValue = this.clientNames.get(id);
    if (cachedValue) {
      return cachedValue;
    }

    const fetchObservable = this.clientService.get(id)
      .pipe(
        map(client => client.fullName),
        tap(clientName => this.clientNames.set(id, of(clientName)))
      );
    this.clientNames.set(id, fetchObservable);

    return fetchObservable;
  }
}
