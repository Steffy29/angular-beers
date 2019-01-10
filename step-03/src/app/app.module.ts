import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BeerListComponent } from './beerList/beerList.component';
import { FilterArrayPipe } from './pipes/filter-array-pipe';

@NgModule({
  declarations: [
    BeerListComponent,
    FilterArrayPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [BeerListComponent]
})
export class AppModule { }
