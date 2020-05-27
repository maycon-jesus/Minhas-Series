import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SerieService } from "src/app/services/serie.service";
@Component({
  selector: "app-series",
  templateUrl: "./series.component.html",
  styleUrls: ["./series.component.css"],
})
export class SeriesComponent implements OnInit {
  constructor(private serieAPI: SerieService, private router: Router) {}

  series = [];

  ngOnInit(): void {
    this.serieAPI
      .getSeries()
      .then((series) => {
        this.series = series;
      })
      .catch((err) => {
        console.log(err);
        window.alert(err);
      });
  }

  navigateTo(url): void {
    this.router.navigate([url]);
  }
}
