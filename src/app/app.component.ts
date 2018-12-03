import { Component } from '@angular/core';
import { TimeZoneService } from './time-zone.service';
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
    time: '',
    country: '',
    zone: ''
  };

  constructor(private timeService: TimeZoneService) {}

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
  }
}
