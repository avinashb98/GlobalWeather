import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {
  // Please get your own TimeZone API key at https://timezonedb.com/register
  apiKey = 'W79BOO2CV3FH';

  getTimeZoneUrl = 'https://api.timezonedb.com/v2.1/get-time-zone';

  constructor(private http: HttpClient) { }

  getTimeZone(lat: number, lng: number) {
    return this.http.get(this.getTimeZoneUrl, {
      params: {
        key: this.apiKey,
        format: 'json',
        by: 'position',
        lat: lat.toString(),
        lng: lng.toString()
      },
      observe: 'response'
    })
    .toPromise();
  }
}
