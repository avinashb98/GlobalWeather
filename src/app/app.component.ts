import { Component, OnInit } from '@angular/core';
import { TimeZoneService } from './time-zone.service';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lat: number;
  lng: number;

  currentLocation = {
    name: '',
    time: '',
    country: '',
    zone: ''
  };

  weather = {
    humidity: 0,
    temperature: 0,
    windSpeed: 0,
    description: ''
  };

  constructor(
    private timeService: TimeZoneService,
    private weatherService: WeatherService
  ) {
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getTimeAndWeather();
      });
    }
  }

  getTimeAndWeather() {
    this.timeService.getTimeZone(this.lat, this.lng)
    .then((response: any) => {
      this.currentLocation.time = this.formatTime(response.body.formatted);
      this.currentLocation.country = response.body.countryName;
      this.currentLocation.zone = response.body.zoneName;
    })
    .catch(err => {
      console.log(err);
    });

    this.weatherService.getWeather(this.lat, this.lng)
    .then((response: any) => {
      this.weather.humidity = Number(response.body.main.humidity);
      this.weather.temperature = Math.floor(Number(response.body.main.temp) - 273);
      this.weather.windSpeed = Math.floor(Number(response.body.wind.speed) * 3.6);
      this.weather.description = response.body.weather[0].main;
      this.currentLocation.name = response.body.name;
    })
    .catch(err => {
      console.log(err);
    });
  }

  onLocationClick(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.getTimeAndWeather();
  }

  formatTime(time) {
    return time.split(' ')[1].split(':').slice(0, 2).join(':');
  }
}
