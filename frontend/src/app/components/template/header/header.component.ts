import { Component, OnInit, Input } from "@angular/core";
import { AppComponent } from "src/app/app.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private app: AppComponent) {}

  title = this.app.title;

  ngOnInit(): void {}
}
