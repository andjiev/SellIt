import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-advert-details',
  templateUrl: './advert-details.component.html',
  styleUrls: ['./advert-details.component.css']
})
export class AdvertDetailsComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {

    this.galleryOptions = [{
      thumbnailsColumns: 3,
      imageAnimation: NgxGalleryAnimation.Fade,
      height: '100%',
      width: '100%'
    }];

    this.galleryImages = [
      {
        small: 'assets/img/sellIt.png',
        medium: 'assets/img/sellIt.png',
        big: 'assets/img/sellIt.png'
      },
      {
        small: 'assets/img/sellIt2.png',
        medium: 'assets/img/sellIt2.png',
        big: 'assets/img/sellIt2.png'
      },
      {
        small: 'assets/img/sellIt2.png',
        medium: 'assets/img/sellIt2.png',
        big: 'assets/img/sellIt2.png'
      },
    ];

    this.apiService.getAdverts().subscribe(
      response => {
        alert();
        this.galleryImages.push({
          small: `data:image/png;base64,${response[0].base64Image}`,
          big: `data:image/png;base64,${response[0].base64Image}`,
          medium: `data:image/png;base64,${response[0].base64Image}`
        });
      }
    );


  }

  navigateToList(): void {
    this.router.navigate(['/adverts']);
  }
}
