# AngularBeer - AngularJS tutorial - Step 10 #

In this final step, we will enhance our Angular Beer web application by attaching CSS and JavaScript animations on top of the template code we created before.

## Dependencies ##

You can build a simple [animation](https://angular.io/docs/ts/latest/guide/animations.html) that transitions an element between two states driven by a model attribute.

Animations are defined inside @Component metadata. Before you can add animations, you need to import a few animation-specific functions:

`app.module.ts`

```typescript
[...]
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
[...]

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
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    routing
  ],
[...]
```


`app/beerdetail/beerDetail.component.ts`

```typescript
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { trigger, state, style, transition, animate } from "@angular/animations";
import {BeerService} from '../beers.service';

@Component({
    selector: 'beer-detail',
    templateUrl: './app/beerdetail/beerDetail.html',
    providers: [BeerService],
    animations: [
        trigger('beerState', [
            state('inactive', style({
                backgroundColor: '#fff',
                transform: 'scale(1)'
            })),
            state('active',   style({
                backgroundColor: '#0275d8',
                transform: 'scale(1.1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ])
    ]
})
export class BeerDetail implements OnInit {
    beer = {};
    mainImg;
    state = {
        img : 'inactive',
        label: 'inactive'
    };

    constructor(private route: ActivatedRoute,
                private beerService: BeerService) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.getBeer(params['id']);
        });
    }

  getBeer(beerId: string) {
    this.beerService.getBeer(beerId).subscribe(beer => {
      this.beer = beer;
      this.setImage('img');
    });
  }

  setImage(obj: string) {
    this.mainImg = `assets/${this.beer[obj]}`;
    if (obj === 'img') {
      this.state.img = 'active';
      this.state.label = 'inactive';
    } else {
      this.state.img = 'inactive';
      this.state.label = 'active';
    }
  }
}
```

## Template ##

Here's what needs to be changed in the file:

`app/beerdetail/beerDetail.html`:

```html
[...]
<ul class="list-inline">
    <li class="list-inline-item">
        <img [src]="beer.img" class="img-thumbnail thumb" (click)="setImage('img')"
             [@beerState]="state.img"
        >
    </li>
    <li class="list-inline-item">
        <img [src]="beer.label" class="img-thumbnail thumb" (click)="setImage('label')"
             [@beerState]="state.label"
        >
    </li>
</ul>
[...]
```

## Experiments ##

More fun, add a fly effect when we enter the detail page :

```html
[...]
<img [src]="mainImg" [@flyInOut]="'in'" class="beer">
[...]
```

```typescript
trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
    ])
])
```


And why not when we navigate ?

On each component declared in the Router (ie : in `app/beerlist/beerList.component.ts`):

```typescript
import { Component, OnInit } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";
[...]
@Component({
    selector: 'beer-list',
    templateUrl: './app/beerlist/beerList.html',
    pipes: [FilterArrayPipe, OrderByPipe],
    host: {
        '[@routeAnimation]': 'true',
        '[style.display]': "'block'",
        '[style.position]': "'absolute'"
    },
    animations: [
        trigger('routeAnimation', [
            state('*', style({transform: 'translateX(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateX(-100%)', opacity: 0}),
                animate(1000)
            ]),
            transition('* => void', animate(1000, style({transform: 'translateX(100%)', opacity: 0})))
        ]),
    ],
    providers: [BeerService]
})
[...]
```

##Summary ##

There you have it! We have created a web app in a relatively short amount of time. Brace yourselves.