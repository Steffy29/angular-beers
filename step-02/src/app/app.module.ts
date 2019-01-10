import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BeerListComponent } from './beerList/beerList.component';

@NgModule({
  declarations: [
    BeerListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [BeerListComponent]
})
export class AppModule { }
