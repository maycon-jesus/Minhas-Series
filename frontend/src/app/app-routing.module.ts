import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { SeriesComponent } from "./pages/series/series.component";
import { SerieComponent } from "./pages/series/serie/serie.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "series",
    component: SeriesComponent,
    pathMatch: "prefix",
  },
  {
    path: "series/:id",
    component: SerieComponent,
    pathMatch: "full",
  },
  {
    path: "series/editar/:id",
    component: SerieComponent,
    pathMatch: "full",
  },
  {
    path: "sobre",
    loadChildren: () =>
      import("./sobre/sobre.module").then((m) => m.SobreModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
