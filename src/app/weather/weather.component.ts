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
  color = Chart.helpers.color;
  
  constructor(private weatherService :WeatherService) { }
  ngOnInit() { }


  getWeather(cityName) {
    this.weatherService.getData(cityName)
      .subscribe(res => {
        var temp_max = res['list'].map(res => res.main.temp_max);
        var temp_min= res['list'].map(res => res.main.temp_min);
        var dates = res['list'].map(res => res.dt);
 
        var dateFormat = [];
        dates.forEach(res => {
          let jsdate = new Date (res*1000);
          dateFormat.push(jsdate.toLocaleTimeString('en',{month: 'short',day: 'numeric'}));
        })       
        
        console.log(res);

        this.chart = new Chart('canvas',{
          type : 'bar',
          data :{
            labels : [dateFormat[0],dateFormat[1],dateFormat[2],dateFormat[3],dateFormat[4],dateFormat[5],dateFormat[6]],
            datasets: [
              {
                label: 'Maximum Temp',
                backgroundColor: '#ff8a80' ,
                borderColor: 'white',
                borderWidth: 1,
                data : temp_max,
              },
              {
                label: 'Maximum Temp',
                backgroundColor: '#5c6bc0' ,
                borderColor: 'white',
                borderWidth: 1,
                data : temp_min,
              },
           ] 
          },
          options : {
            responsive : true,
            legend : {
              position : 'top',
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


