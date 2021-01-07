import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Flow } from "app/classes/Flow";
import { FlowsService } from "app/services/flows.service";

@Component({
    selector: "app-details",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<DetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private flowsService: FlowsService) {}

    flow: Flow;
    ngOnInit(): void {
        this.flow = this.flowsService.flows[this.data.id];
    }

    tabs = [{ title: "Overview" }, { title: "Task Log" }];
    activeTabId = 0;
}

export interface DialogData {
    id: number;
}
