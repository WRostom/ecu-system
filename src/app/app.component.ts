import { Component } from "@angular/core";

import { ConfigurationDAOService } from "./core/api/configuration-dao.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "ecl-system";

  constructor(private ConfigurationDAOService: ConfigurationDAOService) {
    // this
  }
}
