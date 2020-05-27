import { SobreRoutingModule } from "./sobre-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SobreComponent } from "./sobre.component";
import { TecnologiaCardComponent } from "./components/tecnologia-card/tecnologia-card.component";

@NgModule({
  declarations: [SobreComponent, TecnologiaCardComponent],
  imports: [CommonModule, SobreRoutingModule],
  providers: [],
  exports: [],
})
export class SobreModule {}
