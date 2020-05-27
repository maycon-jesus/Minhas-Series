import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { SerieService } from "src/app/services/serie.service";
import { SerieComponent } from "src/app/pages/series/serie/serie.component";

@Component({
  selector: "app-serie-create",
  templateUrl: "./serie-create.component.html",
  styleUrls: ["./serie-create.component.css"],
})
export class SerieCreateComponent implements OnInit {
  constructor(private serieAPI: SerieService, private router: Router) {}

  @Input("modoEdicao") modoEdicao: boolean;
  @Input("modoCriacao") modoCriacao: boolean;

  serie: {
    id?: number;
    nome: string;
    anoInicio: number;
    anoFim: number;
    capaURL: string;
    temporadas: object[];
  };

  ngOnInit(): void {
    this.serie = {
      nome: "",
      anoInicio: 0,
      anoFim: 0,
      capaURL: "",
      temporadas: [],
    };
    if (this.modoEdicao) {
      const path = window.location.pathname.split("/");
      if (path[3]) {
        this.serieAPI
          .getSerie(parseInt(path[3]))
          .then((res) => {
            this.serie = res;
          })
          .catch((err) => {
            console.log(err);
            window.alert(err);
            this.router.navigate(["/series"]);
          });
      } else {
        window.alert("Não é possivel editar uma série inexistente!");
        this.router.navigate(["/series"]);
      }
    }
  }

  criarSerie() {
    this.serieAPI
      .create(this.serie)
      .then((serieID) => {
        window.alert("Série criada com sucesso!");
        this.router.navigate([`/series`]);
      })
      .catch((err) => {
        window.alert(err);
      });
  }
  salvarSerie() {
    this.serieAPI
      .save(this.serie.id, this.serie)
      .then((serieID) => {
        window.alert("Série alterada com sucesso!");
        this.router.navigate([`/series/${serieID}`]);
      })
      .catch((err) => {
        window.alert(err);
      });
  }
}
