import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
    constructor(public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}

export interface ConfirmDialogData {
    title: string;
    description: string;
    strOk: string;
    strCancel: string;
}
