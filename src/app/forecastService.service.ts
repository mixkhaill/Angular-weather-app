import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  apiKey: string = "189b55c7828d643dec69d5d89b0a09f9";
  constructor(private htttp: HttpClient) {}

  getWeather(location) {
    return this.htttp.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=" +
        this.apiKey
    );
  }
}
