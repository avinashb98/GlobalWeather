import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // Please get your own Weather API key at https://home.openweathermap.org/
  apiKey = 'd63c40c9d649bd7162bac345fd4c1a71';
  weatherUrl = `https://api.openweathermap.org/data/2.5/weather`;

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number) {
    return this.http.get(this.weatherUrl, {
      params: {
        appid: this.apiKey,
        lat: lat.toString(),
        lon: lon.toString()
      },
      observe: 'response'
    })
    .toPromise();
  }
}
