import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ForecastService } from "../shared/forecastService.service";
import { WeatherForecast } from "../shared/weather-forecast.interface";
import { Subscription } from "rxjs";
import { LocationData } from "../shared/location.interface";
@Component({
  selector: "app-main-forecast",
  templateUrl: "./main-forecast.component.html",
  styleUrls: ["./main-forecast.component.css"],
})
export class MainForecastComponent implements OnInit, OnDestroy {
  private weatherSubscriptions: Subscription[] = [];
  invalid: boolean = false;
  invalidAddress: string = "Invalid zipcode";
  weatherSearchForm: FormGroup;
  locations: LocationData[] = [];
  forecasts: WeatherForecast[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private forecastService: ForecastService
  ) {}

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""],
    });
    this.locations = this.forecastService.getDisplayedLocations();
    this.locations.forEach((location) => {
      const subscription = this.forecastService
        .getWeather(location.name)
        .subscribe({
          next: (data: WeatherForecast) => {
            data.city.zipcode = location.name;
            this.forecasts.push(data);
            this.forecastService.setForecastData(this.forecasts);
            if (!this.isLocationExist(location)) {
              this.addLocation(location);
            }
          },
          error: (error) => {
            console.log("Wystąpił błąd w czasie pobierania prognozy:", error);
          },
        });
      this.weatherSubscriptions.push(subscription);
    });
  }

  sendData(formValues) {
    const zipcode: string = formValues.location;
    const subscription = this.forecastService
      .getWeather(formValues.location)
      .subscribe({
        next: (data: WeatherForecast) => {
          data.city.zipcode = zipcode;
          this.invalid = false;
          this.forecasts.push(data);
          this.forecastService.setForecastData(this.forecasts);
          const locationData: LocationData = { name: formValues.location };
          if (!this.isLocationExist(locationData)) {
            this.addLocation(locationData);
          }
          this.forecastService.saveDisplayedLocations(this.locations);
        },
        error: (error) => {
          console.log("Wystąpił błąd w czasie pobierania prognozy:", error);
          this.invalid = true;
        },
      });
    this.weatherSubscriptions.push(subscription);
  }

  isLocationExist(location: LocationData): boolean {
    return this.locations.some((loc) => loc.name === location.name);
  }

  addLocation(location: LocationData) {
    if (!this.locations.includes(location)) {
      this.locations.push(location);
    }
  }
  getWeatherIconUrl(weatherStatus: string) {
    return this.forecastService.getWeatherIconUrl(weatherStatus);
  }

  ngOnDestroy(): void {
    this.weatherSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  removeForecast(index: number) {
    this.forecasts.splice(index, 1);
    this.locations.splice(index, 1);
    this.forecastService.saveDisplayedLocations(this.locations);
  }
}
