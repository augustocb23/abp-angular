import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Rest',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44331',
    redirectUri: baseUrl,
    clientId: 'Rest_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone Rest',
  },
  apis: {
    default: {
      url: 'https://localhost:44329',
      rootNamespace: 'Abp.Rest',
    },
  },
} as Environment;
