import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatPaginatorModule,
        MatListModule,
        MatRadioModule,
        MatCheckboxModule,
        MatStepperModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatPaginatorModule,
        MatListModule,
        MatRadioModule,
        MatCheckboxModule,
        MatStepperModule
    ]
})
export class MaterialModule { }
