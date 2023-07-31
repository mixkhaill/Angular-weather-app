import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "kelvinToCelsius",
})
export class KelvinToCelsiusPipe implements PipeTransform {
  transform(kelvin: number): string {
    const celsiusValue = (kelvin - 273.15).toFixed(0);
    return `${celsiusValue}°C`;
  }
}
