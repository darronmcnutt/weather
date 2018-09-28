import { Component, OnInit, Input } from '@angular/core';
import { weatherBit } from '../../environments/environment';
import { CityDetails } from '../models/city-details';
import { WeatherForecast } from '../models/weather-forecast';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.css']
})
export class WeatherForecastListComponent implements OnInit {
  weatherBitUrl: string;
  weatherForecasts: WeatherForecast[];
  @Input() searchText: string;
  cityDetails: CityDetails;
  constructor(private http: HttpClient) {
    this.weatherForecasts = [];
    this.weatherBitUrl = ``;
    this.cityDetails = new CityDetails('','');
  }

  getWeather() {
    this.weatherBitUrl = `${weatherBit.urlBase}?city=${this.searchText}&key=${weatherBit.apiKey}`;
    // subscribe to weatherbit forecast results here
    this.http.get(this.weatherBitUrl).subscribe( (results: any[]) => {
      console.log('WEATHER RESULTS:');
      console.log(results);
      this.weatherForecasts = results['data'];
      console.log('WEATHER FORECAST ARRAY:');
      console.log(this.weatherForecasts);
      this.cityDetails.cityName = results['city_name'];
      this.cityDetails.stateCode = results['state_code'];
    });
  }

  ngOnInit() {
  }

}
