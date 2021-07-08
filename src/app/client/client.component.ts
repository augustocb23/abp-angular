import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ListService, PagedResultDto } from '@abp/ng.core';

import { ClientDto, ClientEditDto, ClientService } from '@proxy/orders';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ListService]
})
export class ClientComponent implements OnInit {
  clients: PagedResultDto<ClientDto>;

  client = {} as ClientEditDto;
  isModalOpen: boolean;
  @ViewChild('form') form: NgForm;

  constructor(public readonly list: ListService, private service: ClientService,
              private confirmation: ConfirmationService) {
  }

  ngOnInit() {
    const clientStreamCreator = (query) => this.service.getList(query);

    this.list.hookToQuery(clientStreamCreator)
      .subscribe((response) => {
        this.clients = response;
      });
  }

  create() {
    this.client = {} as ClientEditDto;
    this.isModalOpen = true;
  }

  edit(id: string) {
    this.service.get(id)
      .subscribe((dto) => {
        this.client = dto as ClientEditDto;
        this.isModalOpen = true;
      });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::Confirmation')
      .subscribe((status) => {
        if (status === Confirmation.Status.confirm) {
          this.service.delete(id).subscribe(() => this.list.get());
        }
      });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.client.id ?
      this.service.update(this.client.id, this.client) :
      this.service.create(this.client);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.list.get();
    });
  }
}
