import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ForecastService } from "../forecastService.service";
import { WeatherForecast } from "./weather-forecast.interface";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-main-forecast",
  templateUrl: "./main-forecast.component.html",
  styleUrls: ["./main-forecast.component.css"],
})
export class MainForecastComponent implements OnInit {
  weatherSearchForm: FormGroup;
  weatherData: any;
  locations: string[] = [];
  forecasts: WeatherForecast[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private forecastService: ForecastService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""],
    });
    
  }

  sendData(formValues) {
    this.forecastService.getWeather(formValues.location).subscribe((data: WeatherForecast) => {
      this.forecasts.push(data);
      this.forecastService.setForecastData(data);
      this.addLocation(formValues.location);
      console.log(this.forecasts, "forecasts");
      console.log(this.locations, "locations")
    });
  }

  addLocation(location: string) {
    if (!this.locations.includes(location)) {
      this.locations.push(location);
    }
  }

  convertKelvinToCelsius(kelvin: number): number {
    return this.forecastService.convertKelvinToCelsius(kelvin);
  }

  getWeatherIconUrl(weatherStatus: string) {
    return this.forecastService.getWeatherIconUrl(weatherStatus);
  }

}
