import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { BeerService } from '../beers.service';

@Component({
  selector: "beer-detail",
  templateUrl: "./beerDetail.html",
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
export class BeerDetailComponent implements OnInit {
  beer = {};
  mainImg;
  state = {
    img: 'inactive',
    label: 'inactive'
  };

  constructor(private route: ActivatedRoute, 
              private beerService: BeerService) {}

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