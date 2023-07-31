import { Component, OnInit } from "@angular/core";
import { ForecastService } from "../forecastService.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-future",
  templateUrl: "./future.component.html",
  styleUrls: ["./future.component.css"],
})
export class FutureComponent implements OnInit {
  zipcode: string
  forecastData: any;
  constructor(private forecastService: ForecastService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.forecastData = this.forecastService.getForecastData();
    this.route.params.subscribe((params) => {
      this.zipcode = params["zipcode"];
    });
    
    console.log(this.forecastData[0].city.name, "forecast-future");
    
  }

  getWeatherIconUrl(weatherStatus: string) {
    return this.forecastService.getWeatherIconUrl(weatherStatus);
  }
  
}
