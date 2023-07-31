import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WeatherForecast } from "./weather-forecast.interface";
import { Observable } from "rxjs";
import { LocationData } from "./location.interface";

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  apiKey: string = "5a4b2d457ecbef9eb2a71e480b947604";
  private forecastData: WeatherForecast[] = [];
  private readonly localStorageKey = "displayedLocations";
  constructor(private http: HttpClient) {}

  getWeather(location): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(
      "https://api.openweathermap.org/data/2.5/forecast/daily?zip=" +
        location +
        ",us&cnt=5&appid=" +
        this.apiKey
    );
  }
  setForecastData(data: WeatherForecast[]) {
    this.forecastData = data;
  }
  getForecastData(): WeatherForecast[] {
    return this.forecastData;
  }
  saveDisplayedLocations(locations: LocationData[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(locations));
  }
  getForecastDataForZipcode(zipcode: string): WeatherForecast | undefined {
    if (this.forecastData) {
      return this.forecastData.find(
        (forecast) => forecast.city.zipcode === zipcode
      );
    }
  }
  getDisplayedLocations(): LocationData[] {
    const storedLocations = localStorage.getItem(this.localStorageKey);
    return storedLocations ? JSON.parse(storedLocations) : [];
  }
  addDisplayedLocation(location: LocationData): void {
    const displayedLocations = this.getDisplayedLocations();
    displayedLocations.push(location);
    this.saveDisplayedLocations(displayedLocations);
  }

  getWeatherIconUrl(weatherStatus: string): string {
    switch (weatherStatus) {
      case "Clear":
        return "https://www.angulartraining.com/images/weather/sun.png";
      case "Rain":
        return "https://www.angulartraining.com/images/weather/rain.png";
      case "Clouds":
        return "https://www.angulartraining.com/images/weather/clouds.png";
      case "Snow":
        return "https://www.angulartraining.com/images/weather/snow.png";
      default:
        return "https://www.angulartraining.com/images/weather/default.png";
    }
  }
}
