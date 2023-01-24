import { Injectable } from "@angular/core";
import { UserInfo } from "../models/UserInfo";

@Injectable({
  providedIn: "root"
})
export class ConfigService {

  userconfig: UserInfo = new UserInfo();

  get getconfig(): UserInfo {
    return this.userconfig
  }

  set setconfig(config: UserInfo) {
    this.userconfig = config;
  }

}

