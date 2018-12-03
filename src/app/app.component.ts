import { Component } from '@angular/core';
import { TimeZoneService } from './time-zone.service';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Global Weather App';
  lat = 51.678418;
  lng = 7.809007;

  currentLocation = {
    name: '',
    time: '',
    country: '',
    zone: ''
  };

  weather = {
    humidity: '',
    temperature: '',
    windSpeed: ''
  };

  constructor(
    private timeService: TimeZoneService,
    private weatherService: WeatherService
  ) {}

  onLocationClick(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.timeService.getTimeZone(this.lat, this.lng)
    .then((response: any) => {
      this.currentLocation.time = response.body.formatted;
      this.currentLocation.country = response.body.countryName;
      this.currentLocation.zone = response.body.zoneName;
      console.log(this.currentLocation);
    })
    .catch(err => {
      console.log(err);
    });

    this.weatherService.getWeather(this.lat, this.lng)
    .then((response: any) => {
      this.weather.humidity = response.body.main.humidity;
      this.weather.temperature = response.body.main.temp;
      this.weather.windSpeed = response.body.wind.speed;
      this.currentLocation.name = response.body.name;
      console.log(this.weather);
    })
    .catch(err => {
      console.log(err);
    });
  }
}
