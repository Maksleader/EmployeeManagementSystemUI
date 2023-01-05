import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './services/config.service';
import { interval, Observable, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

function initializeAppFactory(httpClient: HttpClient, configService: ConfigService): () => Observable<any> {
  console.log('starting backend api call');
  
  return () => httpClient.get("https://localhost:7180/api/Config/config")
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
  providers:[{
    provide:APP_INITIALIZER,
    multi:true,
    useFactory: initializeAppFactory,
    deps:[HttpClient, ConfigService]
  }]
})
export class InitModule { }
