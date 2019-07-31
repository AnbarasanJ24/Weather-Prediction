import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart} from 'chart.js';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  chart = [];
  cityName;
  
  constructor(private weatherService :WeatherService) { }
  ngOnInit(){ }

  getWeather(cityName) {
    this.weatherService.getData(cityName)
      .subscribe(res => {
        this.cityName = res.city.name;
        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let dates = res['list'].map(res => res.dt);
        
        let weatherDates =[]
        dates.forEach(res => {
          let jsdate  = new Date(res *1000)    
          weatherDates.push(jsdate.toDateString());
        });

        console.log(weatherDates);

        
        return this.chart = new Chart('canvas',{
          type : 'line',
          data :{
            labels : dates,
            dataSets: [
              {
                data : temp_max,
                borderColor : '#ffcc00',
                fill : false
              },
              {
                data : temp_min,
                borderColor : '#ffcc00',
                fill : false
              }
           ] 
          },
          options : {
            legend : {
              display : false
            },
            scales: {
              xAxes : [{
                display : true
              }],
              yAxes : [{
                display : true
              }]
            }
          }
        });
      })
    }
}
