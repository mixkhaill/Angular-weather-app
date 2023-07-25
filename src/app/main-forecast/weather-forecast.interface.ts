export interface WeatherForecast {
    city: {
      name: string;
    };
    list: {
      main: {
        temp: number;
        temp_max: number;
        temp_min: number;
      };
      weather: {
        description: string;
        main: string;
      };
    };
  }