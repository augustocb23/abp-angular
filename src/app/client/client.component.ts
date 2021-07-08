import { Component, OnInit } from '@angular/core';
import { ClientDto, ClientService } from '@proxy/orders';
import { ListService, PagedResultDto } from '@abp/ng.core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ListService]
})
export class ClientComponent implements OnInit {
  client: PagedResultDto<ClientDto>;

  constructor(public readonly list: ListService, private clientService: ClientService) {
  }

  ngOnInit() {
    const clientStreamCreator = (query) => this.clientService.getList(query);

    this.list.hookToQuery(clientStreamCreator)
      .subscribe((response) => {
        this.client = response;
      });
  }
}
