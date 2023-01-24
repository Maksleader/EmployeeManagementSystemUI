import { Inject, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { APP_INITIALIZER } from "@angular/core";
import { ConfigService } from "./services/config.service";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GlobalConstants } from "./models/globalConstants";

function initializeAppFactory(httpClient: HttpClient, configService: ConfigService): () => Observable<any> {
  return () => httpClient.get(`${GlobalConstants.apiURL}/Config/config`)
    .pipe(
      tap(result => {
        configService.userconfig = result;
      })
    );
}


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: initializeAppFactory,
    deps: [HttpClient, ConfigService]
  }]
})
export class InitModule {
  constructor(@Inject("baseUrl") private baseUrl: string) { }
}
