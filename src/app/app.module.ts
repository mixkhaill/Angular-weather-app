import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { FutureComponent } from "./future/future.component";
import { AppRoutingModule } from "./app-routing.module";
import { MainForecastComponent } from "./main-forecast/main-forecast.component";
import { ForecastService } from "./shared/forecastService.service";
import { KelvinToCelsiusPipe } from "./shared/kelvin-to-celsius.pipe";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    FutureComponent,
    MainForecastComponent,
    KelvinToCelsiusPipe,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }, ForecastService],
})
export class AppModule {}
