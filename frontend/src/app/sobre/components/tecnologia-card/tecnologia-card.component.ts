import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-tecnologia-card",
  templateUrl: "./tecnologia-card.component.html",
  styleUrls: ["./tecnologia-card.component.css"],
})
export class TecnologiaCardComponent implements OnInit {
  @Input("nome") nome: string;

  constructor() {}

  ngOnInit(): void {}
}
