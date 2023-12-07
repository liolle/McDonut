import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { appRoutes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import {
  HttpClientModule,
  provideHttpClient,
  withFetch
} from "@angular/common/http";
import { cartReducer } from "./shared/cart/reducer";
import { userReducer } from "./shared/auth/reducer";
import { provideEffects } from "@ngrx/effects";
import { AuthEffects } from "./shared/auth/effects";
import { generalReducer } from "./shared/reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    provideRouter(appRoutes),
    provideClientHydration(),
    provideAnimations(),
    provideStore({
      cart: cartReducer,
      user: userReducer,
      general: generalReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([AuthEffects])
  ]
};
