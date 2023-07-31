import { Component, OnInit, OnDestroy } from "@angular/core";
import { ForecastService } from "../shared/forecastService.service";
import { ActivatedRoute } from "@angular/router";
import { WeatherForecast } from "../shared/weather-forecast.interface";
import { Subscription } from "rxjs";

@Component({
  selector: "app-future",
  templateUrl: "./future.component.html",
  styleUrls: ["./future.component.css"],
})
export class FutureComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  zipcode: string;
  forecastData: WeatherForecast | undefined;
  constructor(
    private forecastService: ForecastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.zipcode = params["zipcode"];
      this.forecastData = this.forecastService.getForecastDataForZipcode(
        this.zipcode
      );
      console.log(this.forecastData, "błebłebłe");
    });
  }

  getWeatherIconUrl(weatherStatus: string) {
    return this.forecastService.getWeatherIconUrl(weatherStatus);
  }
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
