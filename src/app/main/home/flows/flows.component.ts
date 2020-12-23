import { Component, Inject, OnInit } from "@angular/core";
import { Flow } from "app/classes/flow";

import { FlowsService } from "app/services/flows.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { RenameComponent } from "./rename/rename.component";
import { Router } from "@angular/router";

@Component({
    selector: "app-flows",
    templateUrl: "./flows.component.html",
    styleUrls: ["./flows.component.scss"],
})
export class FlowsComponent implements OnInit {
    private _unsubscribeAll = new Subject();

    flows: Flow[] = [];

    constructor(
        private flowsService: FlowsService,
        public dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.flows = this.flowsService.flows;
        this.flowsService.flowsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((flows: Flow[]) => {
                this.flows = flows;
            });
    }

    toggleFlow(checked: boolean, id: number) {
        this.flowsService.toggleFlow(checked, id);
    }

    tryRenameFlow(id: number) {
        this.openRenameDialog(id);
    }

    tryDeleteFlow(id: number) {
        this.flowsService.deleteFlow(id);
    }

    tryEditFlow(id: number) {
        this.router.navigate(["editor", id]);
    }

    tryCloneFlow(id: number) {
        this.flowsService.cloneFlow(id);
    }

    openRenameDialog(id: number): void {
        const dialogRef = this.dialog.open(RenameComponent, {
            width: "250px",
            data: { title: this.flows[id].title },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result !== undefined) this.flowsService.renameFlow(id, result);
        });
    }
}
