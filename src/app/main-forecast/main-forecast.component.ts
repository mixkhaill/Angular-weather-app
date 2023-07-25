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
      console.log(this.weatherData);
    });
    console.log(formValues.location);
  }
}
