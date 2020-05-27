import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SerieService } from "src/app/services/serie.service";

@Component({
  selector: "app-serie",
  templateUrl: "./serie.component.html",
  styleUrls: ["./serie.component.css"],
})
export class SerieComponent implements OnInit {
  constructor(private serieAPI: SerieService, private router: Router) {}

  serie: any = {};
  modoCriacao: boolean = false;
  modoEdicao: boolean = false;

  ngOnInit(): void {
    const url = new URL(window.location.href);
    const path = url.pathname.split("/");

    if (path[2] === "criar") {
      this.modoCriacao = true;
    } else if (path[2] === "editar") {
      this.modoEdicao = true;
    }

    if (path[2] && path[2] !== "criar" && path[2] !== "editar") {
      this.serieAPI
        .getSerie(parseInt(path[2]))
        .then((r) => {
          this.serie = r;
          console.log(r);
        })
        .catch((err) => {
          console.log(err);
          window.alert(err);
          this.router.navigate(["/series"]);
        });
    }
  }

  indexTemporada(temporada) {
    return this.serie.temporadas.indexOf(temporada);
  }

  adicionarTemporada() {
    const ano = window.prompt(
      "Qual é o ano em que a temporada foi feita?",
      "2020"
    );
    if (!ano || !parseInt(ano))
      return window.alert("ERRO - O ano informado é inválido!");
    const temporadaData = {
      ano: ano,
      episodios: [],
    };
    const index = this.serie.temporadas.length;
    this.serieAPI
      .saveTemporada(this.serie.id, index, temporadaData)
      .then(() => {
        this.serie.temporadas.push(temporadaData);
      })
      .catch((err) => {
        console.log(err);
        window.alert(err);
      });
  }
}
