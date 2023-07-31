export interface WeatherForecast {
  city: {
    name: string;
    zipcode: string;
  };
  list: {
    temp: {
      day: number;
      max: number;
      min: number;
    };
    weather: {
      description: string;
      main: string;
    };
    dt: string;
  };
}
