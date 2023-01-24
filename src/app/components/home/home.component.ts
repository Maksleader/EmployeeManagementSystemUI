import { Component } from "@angular/core";
import { UserInfo } from "src/app/models/UserInfo";
import { ConfigService } from "src/app/services/config.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})

export class HomeComponent {
  userInfo: UserInfo = this.config.getconfig;
  constructor(public config: ConfigService) { }

}
