import { Component, Input, OnInit } from '@angular/core';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {
  @Input() images: carouselImage[] = [];
  @Input() indicators = true;

  selectedIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  selectedImage(index: number) {
    this.selectedIndex = index;
  }

}
