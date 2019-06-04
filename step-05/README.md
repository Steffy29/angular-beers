# AngularBeer - Angular tutorial - Step 05 #

Enough of building an app with five beers in a hard-coded dataset! Let's fetch a larger dataset from our server using one of Angular's built-in services called `HttpClientModule`. We will use Angular's dependency injection (DI) to provide the service to the `beerList.component` controller.


## Data ##

Our new dataset is now a list of 11 beers stored in JSON format in the `beers/beers.json` file in your project.
This file is available from the server at the URL http://127.0.0.1:4200/beers/beers.json

`beers/beers.json`:

```json
[
  ...
  {
    "alcohol": 6.8,
    "description": "A reddish-brown abbey ale brewed with dark malts. The secondary fermentation gives a fruity aroma and a unique spicy character with a distinctive aftertaste. Secondary fermentation in the bottle.",
    "id": "AffligemDubbel",
    "img": "beers/img/AffligemDubbel.jpg",
    "name": "Affligem Dubbel"
  },
  ...
]
```

## Controller ##

The file `beers/beers.json` need to be load into the application. First, it's necessary to import the node configuration with the command `npm i @types/node`.

`tsconfig.app.json` :

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "types": [
      "node"
    ]
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ]
}
```

`app/app.module.ts` :

```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, JsonpClientBackend }  from '@angular/common/http';
import {BeerList} from './beerList/beerList.component';
import {FilterArrayPipe} from './pipes/filter-array-pipe';
import {OrderByPipe} from './pipes/orderby-pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        JsonpClientBackend,
        HttpClientModule
    ],
    declarations: [
        BeerList,
        FilterArrayPipe,
        OrderByPipe
    ],
    bootstrap: [BeerList]
})
export class AppModule {
}
```

Create interface for beer description

`app/beer.interface.ts` :

```typescript
export interface Beer {
    alcohol: string,
    description: string,
    id: string,
    img: string,
    name: string,
}
```


`app/beers.service.ts` :

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beer } from './beerList/beer.interface';

@Injectable()
export class BeerService {
    // URL to web API
    beersUrl = 'assets/beers/beers.json';

    constructor(private httpClient : HttpClient) {
    }

    getBeers(): Observable<any> {
        return this.httpClient.get<Beer>(this.beersUrl);
    }
}
```

`app/beerlist/beerList.component.ts` :

```typescript
import {Component} from '@angular/core';
import {FilterArrayPipe} from '../pipes/filter-array-pipe';
import {OrderByPipe} from '../pipes/orderby-pipe';
import { BeerService } from '../beers.service';

@Component({
 selector: 'beer-list',
 templateUrl: './app/beerlist/beerList.html',
 providers: [FilterArrayPipe, OrderByPipe, BeerService]
})

export class BeerList {
 orderProp = 'alcohol';
 beers = [];
 mode = 'Promise';

 constructor (private beerService: BeerService) {}

 ngOnInit() { this.getBeers(); }

  getBeers() {
    this.beerService.getBeers().subscribe(data => {
        this.beers = data
    });
  }
}
```

Angular's dependency injector provides services to your controller when the controller is being constructed. The dependency injector also takes care of creating any transitive dependencies the service may have (services often depend upon other services).

## Experiments ##

At the bottom of `app/beerList/beerList.html`, add a `<pre>{{beers | json}}</pre>` binding to see the list of beers displayed in json format.

At the top of `app/beerList/beerList.html`, add a

```html
<div class="alert alert-danger" role="alert" *ngIf="errorMessage">
  <strong>Oh snap!</strong> {{errorMessage}}.
</div>
```

to display an error message, you can test if by modifying the `beerUrl` in `app/beers.service.ts`.

In the BeerList component, pre-process the http response by limiting the number of beers to the first 5 in the list.
Use the following code in the `getBeers` callback:

```typescript
getBeers() {
    this.beerService.getBeers()
        .then(
            beers => { this.beers = beers.splice(0, 5); },
            error =>  this.errorMessage = <any>error);
}
```

## Summary ##

Now that you have learned how easy it is to use Angular services (thanks to Angular's dependency injection), go to [step 6](../step-06), where you will add some thumbnail images of beers and some links.
