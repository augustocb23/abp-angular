import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true }
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application
      },
      {
        path: '/clients-store',
        name: '::Menu:Orders',
        iconClass: 'far fa-clipboard',
        order: 2,
        layout: eLayoutType.application
      },
      {
        path: '/orders',
        name: '::Menu:Orders:List',
        iconClass: 'far fa-clipboard',
        parentName: '::Menu:Orders',
        order: 0,
        layout: eLayoutType.application
      },
      {
        path: '/clients',
        name: '::Menu:Clients:List',
        iconClass: 'fas fa-users',
        parentName: '::Menu:Orders',
        layout: eLayoutType.application
      }
    ]);
  };
}
