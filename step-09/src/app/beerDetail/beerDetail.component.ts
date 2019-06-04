import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BeerService } from '../beers.service';

@Component({
  selector: "beer-detail",
  templateUrl: "./beerDetail.html",
  providers: [BeerService]
})
export class BeerDetailComponent implements OnInit {
  beer = {};
  beerId = 0;
  mainImg;

  constructor(private route: ActivatedRoute, private beerService: BeerService) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.getBeer(params['id']);
    });
  }

  getBeer(beerId: string) {
    this.beerService.getBeer(beerId).subscribe(beer => {
      this.beer = beer;
      this.setImage(beer.img);
    });
  }

  setImage(img: string) {
    this.mainImg = `assets/${img}`;
    console.log(this.mainImg);
  }
}