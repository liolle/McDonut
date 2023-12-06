import { Routes } from "@angular/router";
import { LandingComponent } from "./pages/landing/landing.component";
import { PageNotFoundComponent } from "./pages/not-found/not-found.component";
import { ProductsComponent } from "./pages/products/products.component";
import { refreshAuth } from "./guards/authGard";

export const appRoutes: Routes = [
  {
    path: "",
    canActivate: [refreshAuth],
    loadComponent: () =>
      import("./pages/landing/landing.component").then(
        (c) => c.LandingComponent
      )
  },
  {
    path: "products",
    canActivate: [refreshAuth],
    loadComponent: () =>
      import("./pages/products/products.component").then(
        (c) => c.ProductsComponent
      )
  },
  { path: "**", component: PageNotFoundComponent }
];
