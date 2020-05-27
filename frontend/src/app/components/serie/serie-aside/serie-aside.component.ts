import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { SerieService } from "src/app/services/serie.service";

@Component({
  selector: "app-serie-aside",
  templateUrl: "./serie-aside.component.html",
  styleUrls: ["./serie-aside.component.css"],
})
export class SerieAsideComponent implements OnInit {
  constructor(private Router: Router, private serieAPI: SerieService) {}

  @Input("serie") serie: any;

  ngOnInit(): void {}

  textAnoFim(anoFim) {
    if (anoFim === 0) {
      return "";
    } else {
      return `${anoFim}`;
    }
  }

  navigateEditar(id) {
    this.Router.navigate([`/series/editar/${id}`]);
  }

  countTemporadas() {
    if (!this.serie.temporadas) return 0;
    return this.serie.temporadas.length;
  }

  countEpisodios() {
    if (!this.serie.temporadas) return 0;
    return this.serie.temporadas
      .map((t) => t.episodios.length)
      .reduce((p, v) => p + v, 0);
  }

  countEpisodiosVistos() {
    if (!this.serie.temporadas) return 0;
    return this.serie.temporadas
      .map((t) => t.episodios.filter((e) => e.visto).length)
      .reduce((p, v) => p + v, 0);
  }

  excluirSerie() {
    const confirm = window.confirm(
      "Você tem certeza que deseja excluir esta série?"
    );
    if (!confirm) return;
    this.serieAPI
      .delete(this.serie.id)
      .then(() => {
        window.alert("Serie excluida com sucesso!");
        this.Router.navigate(["/series"]);
      })
      .catch((err) => {
        window.alert(err);
      });
  }
}
