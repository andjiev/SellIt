import { CommonVariables } from './../../utils/commonVariables';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { IAdvertisementCategory } from './../../models/enums';
import { IAdvertisementDto, IPaging } from './../../models/models';
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

    private advertSubscription: Subscription;
    private searchChangeSubscription: Subscription;
    private categoryChangeSubscription: Subscription;
    private cityChangeSubscription: Subscription;

    public categories = CommonVariables.categories;
    public cities = CommonVariables.cities;
    public advertsData = new MatTableDataSource<IAdvertisementDto>();
    public filterGroup: FormGroup;
    public pageEvent: PageEvent;
    public selectedCategory: string;
    public isLoading = true;
    public isReset = false;

    public paging: IPaging = {
        page: 1,
        pageSize: 10,
        category: 0,
        searchString: '',
        location: ''
    };

    constructor(private apiService: ApiService,
        private formBuilder: FormBuilder,
        private router: Router,
        private notificationService: NotificationsService) {
        this.filterGroup = formBuilder.group({
            search: [''],
            category: ['0'],
            city: ['0']
        });
        this.advertsData.paginator = this.paginator;
    }

    ngOnInit() {
        this.subscribeToFilters();
        this.getAdverts();
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
        this.isReset = true;
        this.isLoading = true;
        this.filterGroup.controls.search.setValue('');
        this.filterGroup.controls.category.setValue('0');
        this.filterGroup.controls.city.setValue('0');
        this.paginator.pageIndex = 0;
        this.paging.page = 1;
        this.getAdverts();
    }

    public navigateToDetails(advertUid: string): void {
        this.router.navigate(['adverts', advertUid]);
    }

    private getAdverts() {
        this.advertsData.data = [];
        this.isLoading = true;

        this.advertSubscription = this.apiService.getAdverts(this.paging).subscribe(
            response => {
                this.advertsData.data = response.list;
                this.pageEvent = {
                    pageIndex: 0,
                    pageSize: this.paging.pageSize,
                    length: response.totalCount
                };
            },
            error => {
                switch (error.status) {
                    default:
                        this.notificationService.error('Грешка', 'Проблем со серверот');
                        break;
                }
            },
            () => {
                this.isLoading = false;
                this.isReset = false;
            }
        );
    }

    public onPaginationChange(paging: any): void {
        this.paging.page = paging.pageIndex + 1;
        this.paging.pageSize = paging.pageSize;
        this.getAdverts();
    }

    private subscribeToFilters(): void {
        const controls = this.filterGroup.controls;
        this.searchChangeSubscription = controls.search.valueChanges
            .distinctUntilChanged()
            .debounceTime(400)
            .subscribe(newValue => {
                this.paging.page = 1;
                this.paging.searchString = newValue;
                if (!this.isReset) {
                    this.getAdverts();
                }
            });
        this.categoryChangeSubscription = controls.category.valueChanges
            .subscribe(newValue => {
                this.paging.page = 1;
                this.paging.category = newValue;
                if (!this.isReset) {
                    this.getAdverts();
                }
            });
        this.cityChangeSubscription = controls.city.valueChanges
            .subscribe(newValue => {
                this.paging.page = 1;
                +newValue === 0 ?
                    this.paging.location = '' :
                    this.paging.location = this.cities[newValue].viewValue;
                if (!this.isReset) {
                    this.getAdverts();
                }
            });
    }

    private removeSubscriptions(): void {
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

    ngOnDestroy() {
        this.removeSubscriptions();
    }
}
