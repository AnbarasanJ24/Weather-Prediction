import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { WeatherService} from './weather.service';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
