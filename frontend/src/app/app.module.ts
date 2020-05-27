import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/template/header/header.component";
import { HomeComponent } from "./pages/home/home.component";

import { SeriesComponent } from "./pages/series/series.component";
import { SerieService } from "./services/serie.service";
import { SerieCardComponent } from "./components/serie/serie-card/serie-card.component";

import { SerieCapaDirective } from "./directives/serie-capa.directive";
import { SerieComponent } from "./pages/series/serie/serie.component";
import { SerieAsideComponent } from "./components/serie/serie-aside/serie-aside.component";
import { SerieCreateComponent } from "./components/serie/serie-create/serie-create.component";
import { SerieTemporadaComponent } from "./components/serie/serie-temporada/serie-temporada.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SeriesComponent,
    SerieCardComponent,
    SerieCapaDirective,
    SerieComponent,
    SerieAsideComponent,
    SerieCreateComponent,
    SerieTemporadaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [SerieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
