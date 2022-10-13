import { Component, Input, OnInit } from '@angular/core';
import { CarouselImage } from '../carousel/carousel.component';
import { Profil } from '../../models/profil.model';
import { Sale } from '../../models/sale.model';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.sass']
})
export class CardDetailComponent implements OnInit {
  @Input() sale: Sale | undefined;
  @Input() profil: Profil | undefined;
  showDetail = false;
  images: CarouselImage[] = [];

  constructor() { }

  ngOnInit(): void {
    !!this.sale?.pictureOne ? this.images.push({
      imageSrc: '/assets/sales/' + this.sale?.pictureOne,
      imageAlt: 'Photo1'
    }) : null;
    !!this.sale?.pictureTwo ? this.images.push({
      imageSrc: '/assets/sales/' + this.sale?.pictureTwo,
      imageAlt: 'Photo1'
    }) : null;
    !!this.sale?.pictureThree ? this.images.push({
      imageSrc: '/assets/sales/' + this.sale?.pictureThree,
      imageAlt: 'Photo1'
    }) : null;
  }

  toggleDetail() {
    this.showDetail = !this.showDetail
  }

}
