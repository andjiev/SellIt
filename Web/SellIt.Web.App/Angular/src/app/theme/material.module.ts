import { NgModule } from '@angular/core';
import { MatPaginatorIntlMak } from './material-custom-paginator';

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
    MatStepperModule,
    MatTableModule,
    MatPaginatorIntl
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
        MatStepperModule,
        MatTableModule
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
        MatStepperModule,
        MatTableModule
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntlMak }
    ]
})
export class MaterialModule { }
