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
import { cartReducer } from "./shared/cart/cart.reducer";
import { HttpClientModule } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes),
    provideClientHydration(),
    provideAnimations(),
    provideStore({ cart: cartReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
