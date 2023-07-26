import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WeatherForecast } from "./main-forecast/weather-forecast.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  apiKey: string = "189b55c7828d643dec69d5d89b0a09f9";
  private forecastData: any;
  constructor(private htttp: HttpClient) {}

  getWeather(location): Observable<WeatherForecast> {
    return this.htttp.get<WeatherForecast>(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        location +
        "&cnt=5&appid=" +
        this.apiKey
    );
  }
  setForecastData(data: any) {
    this.forecastData = data;
    console.log(this.forecastData);
  }

  getForecastData() {
    return this.forecastData;
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
