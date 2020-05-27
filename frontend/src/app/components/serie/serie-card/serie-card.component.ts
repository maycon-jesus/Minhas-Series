import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "serie-card",
  templateUrl: "./serie-card.component.html",
  styleUrls: ["./serie-card.component.css"],
})
export class SerieCardComponent implements OnInit {
  constructor(private router: Router) {}

  @Input("serie") serie: any;

  ngOnInit(): void {}

  textAnoFim(anoFim) {
    if (anoFim === 0) {
      return "";
    } else {
      return `${anoFim}`;
    }
  }

  clickVisit(serieID) {
    this.router.navigate([`/series/${serieID}`]);
  }
}
