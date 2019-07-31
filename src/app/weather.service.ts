import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {

  apikey : string = 'c4a6ab5e461a2ef6a2afd648db376615';
  private url = "http://api.openweathermap.org/data/2.5/forecast?q=";

  constructor(private http : Http) { }

  getData(cityName) {
    return this.http.get(this.url+ cityName +'&APPID='+ this.apikey) 
      .map(response=> response.json());
  }


}
