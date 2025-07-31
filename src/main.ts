import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app/app.routes';

// bootstrapApplication(App, appConfig, ).catch((err) => console.error(err));
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes, withHashLocation()),
  ],
}).catch((err) => console.error(err));
