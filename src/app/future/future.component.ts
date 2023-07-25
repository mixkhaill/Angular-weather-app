import { Component, OnInit } from "@angular/core";
import { ForecastService } from "../forecastService.service";

@Component({
  selector: "app-future",
  templateUrl: "./future.component.html",
  styleUrls: ["./future.component.css"],
})
export class FutureComponent implements OnInit {
  forecastData: any;
  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastData = this.forecastService.getForecastData();
    console.log(this.forecastData, "forecast-future");
  }

  convertKelvinToCelsius(kelvin: number): number {
    return this.forecastService.convertKelvinToCelsius(kelvin);
  }
  getWeatherIconUrl(weatherStatus: string) {
    return this.forecastService.getWeatherIconUrl(weatherStatus);
  }
}
