import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flow } from '../../../../shared/classes/flow';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
    constructor(
        public dialogRef: MatDialogRef<DetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public flow: Flow
    ) {}

    tabs = [{ title: 'Overview' }, { title: 'Task Log' }];
    activeTabId = 0;
}
