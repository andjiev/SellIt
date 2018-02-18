import { Router } from '@angular/router';
import { IAdvertisementCategory } from './../../models/enums';
import { IAdvertisementDto } from './../../models/models';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  categories = [
    { value: '0', viewValue: 'Сите' },
    { value: '1', viewValue: 'Автомобил' },
    { value: '2', viewValue: 'Телефон' }
  ];

  cities = [
    { value: '0', viewValue: 'Сите' },
    { value: '1', viewValue: 'Битола' },
    { value: '2', viewValue: 'Скопје' },
    { value: '3', viewValue: 'Куманово' },
    { value: '4', viewValue: 'Тетово' },
    { value: '5', viewValue: 'Прилеп' },
    { value: '6', viewValue: 'Велес' }
  ];

  private advertSubscription: Subscription;
  private searchChangeSubscription: Subscription;
  private categoryChangeSubscription: Subscription;
  private cityChangeSubscription: Subscription;

  public filteredAdverts = new MatTableDataSource<IAdvertisementDto>();
  public advertsData: IAdvertisementDto[];
  public filterGroup: FormGroup;
  public pageEvent: PageEvent;
  public selectedCategory: string;
  public isLoading = true;

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.filterGroup = formBuilder.group({
      search: [''],
      category: ['0'],
      city: ['0']
    });

    const controls = this.filterGroup.controls;

    this.searchChangeSubscription = controls.search.valueChanges
      .distinctUntilChanged()
      .debounceTime(400)
      .subscribe(newValue => {
        this.filteredAdverts.data = this.advertsData
          .filter(x => x.title.toUpperCase().indexOf(newValue.toUpperCase()) !== -1
            && (!+controls.category.value || x.category === +controls.category.value)
            && (!+controls.city.value || x.location === this.cities[controls.city.value].viewValue));
      });

    this.categoryChangeSubscription = controls.category.valueChanges
      .subscribe(newValue => {
        this.filteredAdverts.data = this.advertsData
          .filter(x => (!+newValue || x.category === +newValue) &&
            x.title.toUpperCase().indexOf(controls.search.value.toUpperCase()) !== -1
            && (!+controls.city.value || x.location === this.cities[controls.city.value].viewValue));
      });

    this.categoryChangeSubscription = controls.city.valueChanges
      .subscribe(newValue => {
        this.filteredAdverts.data = this.advertsData
          .filter(x => (!+newValue || x.location === this.cities[newValue].viewValue) &&
            (!+controls.category.value || x.category === +controls.category.value) &&
            x.title.toUpperCase().indexOf(controls.search.value.toUpperCase()) !== -1);
      });
  }

  ngOnInit() {
    this.advertSubscription = this.apiService.getAdverts().subscribe(
      response => {
        this.filteredAdverts.data = response;
        this.advertsData = this.filteredAdverts.data;
        this.pageEvent = {
          pageIndex: 0,
          pageSize: 10,
          length: this.filteredAdverts.data.length
        };
        this.filteredAdverts.paginator = this.paginator;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  public getCategoryText(category: IAdvertisementCategory): string {
    switch (category) {
      case IAdvertisementCategory.Car:
        return 'Автомобил';
      case IAdvertisementCategory.Mobile:
        return 'Телефон';
    }
  }

  public removeFilters(): void {
    this.filterGroup.controls.search.setValue('');
    this.filterGroup.controls.category.setValue('0');
    this.filterGroup.controls.city.setValue('0');
  }

  navigateToDetails(advertUid: string): void {
    this.router.navigate(['adverts', advertUid]);
  }

  ngOnDestroy() {
    if (this.advertSubscription) {
      this.advertSubscription.unsubscribe();
      this.advertSubscription = null;
    }

    if (this.searchChangeSubscription) {
      this.searchChangeSubscription.unsubscribe();
      this.searchChangeSubscription = null;
    }

    if (this.categoryChangeSubscription) {
      this.categoryChangeSubscription.unsubscribe();
      this.categoryChangeSubscription = null;
    }

    if (this.cityChangeSubscription) {
      this.cityChangeSubscription.unsubscribe();
      this.cityChangeSubscription = null;
    }
  }
}
