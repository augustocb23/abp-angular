import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ListService, PagedResultDto } from '@abp/ng.core';

import { ClientService, OrderDto, OrderService } from '@proxy/orders';
import { getWithCache } from '../shared/get-with-cache';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [ListService]
})
export class OrderComponent implements OnInit {
  @ViewChild('table') table: any;
  orders: PagedResultDto<OrderDto>;

  private clientNames = new Map<string, Observable<string>>();

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

  getClientName(clientId: string): Observable<string> {
    const fetchObservable = this.clientService.get(clientId)
      .pipe(map(client => client.fullName));

    return getWithCache(fetchObservable, this.clientNames, clientId);
  }

  toggleExpandRow(order: OrderDto) {
    this.table.rowDetail.toggleExpandRow(order);
  }
}
