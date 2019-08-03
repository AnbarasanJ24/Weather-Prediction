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


  getWeather(cityName) {
    this.weatherService.getData(cityName)
      .subscribe(res => {
        var cityName = res.city.name;
        var temp_max = res['list'].map(res => res.main.temp_max);
        var temp_min= res['list'].map(res => res.main.temp_min);
        var dates = res['list'].map(res => res.dt_txt);

        
        
        console.log(temp_max);
        console.log(cityName);

        this.chart = new Chart('canvas',{
          type : 'bar',
          data :{
            labels : [dates],
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

    ngOnInit() {
    
      
     }
}


