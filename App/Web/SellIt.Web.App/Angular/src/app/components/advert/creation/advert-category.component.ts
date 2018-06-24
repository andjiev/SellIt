import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-advert-category',
  templateUrl: './advert-category.component.html',
  styleUrls: ['./advert-category.component.css']
})
export class AdvertCategoryComponent {
  isCategorySelected = true;
  selectedCategory: string;

  categories = [
    { value: '1', viewValue: 'Автомобил' },
    { value: '2', viewValue: 'Телефон' }
  ];

  constructor(private router: Router) { }

  navigateToAdvert() {
    this.router.navigate(['adverts/new', this.selectedCategory]);
  }
}
