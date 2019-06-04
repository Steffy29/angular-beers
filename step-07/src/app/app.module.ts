import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { FilterArrayPipe } from "./pipes/filter-array-pipe";
import { OrderByPipe } from "./pipes/orderby-pipe";
import { routing } from "./app.routing";
import { BeerListComponent } from './beerList/beerList.component';
import { BeerDetailComponent } from './beerDetail/beerDetail.component';

@NgModule({
  declarations: [
    AppComponent, 
    FilterArrayPipe, 
    OrderByPipe,
    BeerListComponent,
    BeerDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
