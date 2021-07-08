import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';


@NgModule({
  declarations: [ClientComponent],
  imports: [
    ClientRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ClientModule {
}
