import type { OrderDto, OrderItemDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiName = 'Default';

  get = (id: string) =>
    this.restService.request<any, OrderDto>({
      method: 'GET',
      url: `/api/app/order/${id}`,
    },
    { apiName: this.apiName });

  getItemsById = (id: string) =>
    this.restService.request<any, OrderItemDto[]>({
      method: 'GET',
      url: `/api/app/order/${id}/items`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<OrderDto>>({
      method: 'GET',
      url: '/api/app/order',
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
