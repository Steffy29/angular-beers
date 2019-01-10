import { Injectable } from '@angular/core';

@Injectable()
export class BeerService {
    beersJson = require('../beers/beers.json');

    getBeers() {
        return this.beersJson;
    }
}
