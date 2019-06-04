import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BeerListComponent } from "./beerList/beerList.component";
import { BeerDetailComponent } from "./beerDetail/beerDetail.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/beers",
    pathMatch: "full"
  },
  {
    path: "beers",
    component: BeerListComponent
  },
  {
    path: "beers/:id",
    component: BeerDetailComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: true
});
