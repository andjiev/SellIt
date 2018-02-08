import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';

@Component({
  selector: 'app-advert-details',
  templateUrl: './advert-details.component.html',
  styleUrls: ['./advert-details.component.css']
})
export class AdvertDetailsComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private router: Router) { }

  ngOnInit() {

    this.galleryOptions = [
      {
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Fade,
        height: '100%',
        width: '100%'

      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100px',
        height: '50px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/img/sellIt2.png',
        medium: 'assets/img/sellIt2.png',
        big: 'assets/img/sellIt2.png'
      },
      {
        small: 'assets/img/sellIt.png',
        medium: 'assets/img/sellIt.png',
        big: 'assets/img/sellIt.png'
      },
      {
        small: 'assets/img/sellIt.png',
        medium: 'assets/img/sellIt.png',
        big: 'assets/img/sellIt.png'
      }
    ];
  }

  navigateToList(): void {
    this.router.navigate(['/adverts']);
  }

}
