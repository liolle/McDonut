import { Routes } from "@angular/router";
import { LandingComponent } from "./pages/landing/landing.component";
import { PageNotFoundComponent } from "./pages/not-found/not-found.component";
import { ProductsComponent } from "./pages/products/products.component";
import { LoginComponent } from "./pages/login/login.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "login",
    component: LoginComponent
  },

  { path: "**", component: PageNotFoundComponent }
];
