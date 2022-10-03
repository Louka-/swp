import { Component, Input, OnInit } from '@angular/core';
import { Profil } from '../models/profil.model';
import { Sale } from '../models/sale.model';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.sass']
})
export class CardDetailComponent implements OnInit {
  @Input() sale: Sale | undefined;
  @Input() profil: Profil | undefined;
  showDetail = false;
  images = [
    {
      imageSrc: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      imageAlt: 'test'
    },
    {
      imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      imageAlt: 'test'
    },
    {
      imageSrc: 'https://material.angular.io/assets/img/examples/shiba3.jpg',
      imageAlt: 'test'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleDetail() {
    this.showDetail = !this.showDetail
  }

}
