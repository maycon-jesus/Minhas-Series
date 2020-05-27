import { Component, OnInit, Input } from "@angular/core";
import { SerieService } from "src/app/services/serie.service";
import { SerieComponent } from "src/app/pages/series/serie/serie.component";

@Component({
  selector: "app-serie-temporada",
  templateUrl: "./serie-temporada.component.html",
  styleUrls: ["./serie-temporada.component.css"],
})
export class SerieTemporadaComponent implements OnInit {
  @Input("temporada") temporada: any;
  @Input("temporadaID") temporadaID: number;
  @Input("serieID") serieID: number;

  addEpisodio: boolean = false;
  addEpisodioForm: any = {};
  episodiosEditando: number[] = [];

  constructor(private serieAPI: SerieService, private serie: SerieComponent) {}

  ngOnInit(): void {}

  addEpisodioToggle(): void {
    this.addEpisodioForm = {
      titulo: "",
      visto: false,
    };
    this.addEpisodio = !this.addEpisodio;
  }

  editarEpisodio(index): void {
    this.episodiosEditando.push(index);
  }

  indexEpisodio(episodio): number {
    return this.temporada.episodios.indexOf(episodio);
  }

  salvar(): void {
    this.episodiosEditando = [];
    this.serieAPI
      .saveTemporada(this.serieID, this.temporadaID, this.temporada)
      .catch((err) => {
        window.location.reload();
        console.log(err);
        window.alert(err);
      });
  }

  criarEpisodio(): void {
    this.temporada.episodios.push({ ...this.addEpisodioForm });
    this.serieAPI
      .saveTemporada(this.serieID, this.temporadaID, this.temporada)
      .catch((err) => {
        this.temporada.episodios.pop();
        console.log(err);
        window.alert(err);
      });
  }

  deleteEpisodio(index): void {
    const confirm = window.confirm(
      "Tem certeza que você deseja excluir este episódio?"
    );
    if (!confirm) return;
    this.serieAPI
      .saveTemporada(this.serieID, this.temporadaID, this.temporada)
      .then((t) => {
        this.temporada.episodios = this.temporada.episodios.filter(
          (e, i) => i !== index
        );
      })
      .catch((err) => {
        console.log(err);
        window.alert(err);
      });
  }

  excluirTemporada(): void {
    const confirm = window.confirm(
      "Tem certeza que você deseja excluir esta temporada?"
    );
    if (!confirm) return;
    this.serieAPI
      .deleteTemporada(this.serieID, this.temporadaID)
      .then(() => {
        this.serie.ngOnInit();
      })
      .catch((err) => {
        console.log(err);
        window.alert(err);
      });
  }
}
