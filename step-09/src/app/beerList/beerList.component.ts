import { Component } from '@angular/core';
import { FilterArrayPipe } from '../pipes/filter-array-pipe';
import { OrderByPipe } from '../pipes/orderby-pipe';
import { BeerService } from '../beers.service';

@Component({
    selector: 'beer-list',
    templateUrl: './beerList.html',
    providers: [FilterArrayPipe, OrderByPipe, BeerService]
})

export class BeerListComponent {
    orderProp = 'alcohol';
    mode = 'Promise';
    beers = [];

    constructor(private beerService: BeerService) { }

    ngOnInit() {
        this.getBeers();
    }

    getBeers() {
        this.beerService.getBeers().subscribe(data => {
            this.beers = data
        });
    }

}
