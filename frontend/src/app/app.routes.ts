import { Routes } from "@angular/router";
import { LandingComponent } from "./pages/landing/landing.component";
import { PageNotFoundComponent } from "./pages/not-found/not-found.component";
import { ProdutsComponent } from "./pages/products/products.component";


export const appRoutes: Routes = [
  { path: "", component: LandingComponent },
  { path: "products", component: ProdutsComponent },
  { path: "**", component: PageNotFoundComponent } // Wildcard route for a 404 page
];
