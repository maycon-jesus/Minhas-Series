import { AppComponent } from "./../../app.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private app: AppComponent) {}

  title = this.app.title;
  author = this.app.author;
  version = this.app.version;

  ngOnInit(): void {}
}
