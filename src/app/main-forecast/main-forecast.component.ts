import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ForecastService } from "../forecastService.service";

@Component({
  selector: "app-main-forecast",
  templateUrl: "./main-forecast.component.html",
  styleUrls: ["./main-forecast.component.css"],
})
export class MainForecastComponent implements OnInit {
  weatherSearchForm: FormGroup;
  weatherData: any;
  locations: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private forecastService: ForecastService
  ) {}

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""],
    });
  }

  sendData(formValues) {
    this.forecastService.getWeather(formValues.location).subscribe((data) => {
      this.weatherData = data;
      this.forecastService.setForecastData(data);
      this.addLocation(formValues.location);
      console.log(this.weatherData);
    });
  }

  addLocation(location: string) {
    this.locations.push(location);
  }

  convertKelvinToCelsius(kelvin: number): number {
    return this.forecastService.convertKelvinToCelsius(kelvin);
  }

  getWeatherIconUrl(weatherStatus: string) {
    return this.forecastService.getWeatherIconUrl(weatherStatus);
  }
}
