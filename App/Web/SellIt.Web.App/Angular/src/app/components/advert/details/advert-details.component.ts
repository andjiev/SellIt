import { AuthService } from './../../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { IAdvertisementCategory, IAdvertisementType } from './../../../models/enums';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';
import { ApiService } from '../../../services/api.service';
import { IAdvertisementDetails } from '../../../models/models';

@Component({
    selector: 'app-advert-details',
    templateUrl: './advert-details.component.html',
    styleUrls: ['./advert-details.component.css']
})
export class AdvertDetailsComponent implements OnInit {
    @ViewChild('dissmissModal') dissmissModal: ElementRef;

    galleryImages = new Array<NgxGalleryImage>();
    galleryOptions = [{
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Fade,
        height: '100%',
        width: '100%'
    }];

    public advertUid: string;
    public advertDetails: IAdvertisementDetails;
    public AdvertCategory = IAdvertisementCategory;
    public isLoading = true;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private notificationService: NotificationsService,
        private authService: AuthService) { }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.advertUid = params['uid'];
            }
        );

        this.apiService.getAdvertDetails(this.advertUid).subscribe(
            response => {
                this.advertDetails = response;
                this.advertDetails.base64Images.forEach(base64Image => {
                    this.galleryImages.push({
                        small: `data:image/png;base64,${base64Image}`,
                        medium: `data:image/png;base64,${base64Image}`,
                        big: `data:image/png;base64,${base64Image}`
                    });
                });
                this.isLoading = false;
            },
            error => {

            }
        );
    }

    navigateToList(): void {
        this.router.navigate(['adverts']);
    }

    deleteAdvert(): void {
        if (this.authService.isloggedIn()) {
            this.apiService.deleteAdvert(this.advertUid).subscribe(
                response => {
                    this.dissmissModal.nativeElement.click();
                    this.notificationService.success('Успешно', 'Огласот е успешно избришан');
                    this.router.navigate(['adverts']);
                },
                error => {
                    switch (error.status) {
                        case 401:
                            this.notificationService.error('Грешка', 'Само администратор може да брише огласи');
                            break;
                        default:
                            this.notificationService.error('Грешка', 'Проблем со серверот');
                            break;
                    }
                    this.dissmissModal.nativeElement.click();
                }
            );
        }
        else {
            this.dissmissModal.nativeElement.click();
            this.router.navigate(['profile', 'login']);
        }

    }

    public getCategoryText(category: IAdvertisementCategory): string {
        switch (category) {
            case IAdvertisementCategory.Car:
                return 'Автомобил';
            case IAdvertisementCategory.Mobile:
                return 'Телефон';
        }
    }

    public getTypeText(type: IAdvertisementType): string {
        switch (type) {
            case IAdvertisementType.New:
                return 'Нов';
            case IAdvertisementType.Old:
                return 'Стар';
        }
    }
}
