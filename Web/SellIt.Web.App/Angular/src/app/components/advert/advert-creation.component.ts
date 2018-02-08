import { Component } from '@angular/core';

@Component({
  selector: 'app-advert-creation',
  templateUrl: './advert-creation.component.html',
  styleUrls: ['./advert-creation.component.css']
})
export class AdvertCreationComponent {

  //public config: DropzoneConfigInterface = {
  //  url: 'https://httpbin.org/post',
  //  maxFiles: 10,
  //  uploadMultiple: true,
  //  clickable: true,
  //  acceptedFiles: 'image/*',
  //  createImageThumbnails: true
  //};

  isCategorySelected = true;
  selectedCategory: string;

  categories = [
    { value: 'avto', viewValue: 'Автомобил' },
    { value: 'tel', viewValue: 'Телефон' }
  ];

  constructor() { }

  saveCategory() {
    alert(this.selectedCategory);

  }

}
