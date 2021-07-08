import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/client-store',
        name: '::Menu:Clients',
        iconClass: 'fas fa-users',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/client',
        name: '::Menu:Clients:List',
        parentName: '::Menu:Clients',
        layout: eLayoutType.application,
      },
    ]);
  };
}
