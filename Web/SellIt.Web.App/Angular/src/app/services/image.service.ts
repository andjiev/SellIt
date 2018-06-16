import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
    public images: any;

    constructor() { }

    public setImages(images: any) {
        this.images = images;
    }

    public getImages(): any[] {
        return this.images;
    }

    private getBase64(input: any): any {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            return btoa(fileReader.result);
        };
        fileReader.readAsBinaryString(input.file);
    }
}
