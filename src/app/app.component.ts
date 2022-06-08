import { Component } from "@angular/core";

import { ConfigurationDAOService } from "./core/api/configuration-dao.service";
import { ConfigDataService } from "./core/services/global-config.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "ecl-system";

  constructor(private ConfigurationDAOService: ConfigurationDAOService, private globalConfigService: ConfigDataService) {
    this.ConfigurationDAOService.getAll().subscribe((res) => {
      this.globalConfigService.setConfigData(res);
      console.log(res, "config data");
    });
  }
}
