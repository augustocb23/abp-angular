import type { AuditedEntityDto } from '@abp/ng.core';

export interface ClientDto extends AuditedEntityDto<string> {
  fullName?: string;
}

export interface ClientEditDto {
  id?: string;
  fullName: string;
}

export interface OrderDto extends AuditedEntityDto<string> {
  clientId?: string;
}

export interface OrderItemDto {
  productId?: string;
  quantity: number;
}

export interface ProductDto extends AuditedEntityDto<string> {
  name?: string;
}

export interface ProductEditDto {
  id?: string;
  name: string;
}
