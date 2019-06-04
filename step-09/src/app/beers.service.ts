import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beer } from './beer.interface';

@Injectable()
export class BeerService {
    // URL to web API
    beersUrl = 'assets/beers/beers.json';

    constructor(private httpClient : HttpClient) {
    }
    
    getBeers(): Observable<any> {
        return this.httpClient.get<Beer>(this.beersUrl);
    }

    getBeer(beerId: String): Observable<any> {
        return this.httpClient.get<Beer>('assets/beers/' + beerId + '.json');
    }
}
