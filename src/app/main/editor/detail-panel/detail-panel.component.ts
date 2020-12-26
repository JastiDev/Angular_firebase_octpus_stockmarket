import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Flow } from "app/classes/Flow";

@Component({
    selector: "editor-detail-panel",
    templateUrl: "./detail-panel.component.html",
    styleUrls: ["./detail-panel.component.scss"],
})
export class DetailPanelComponent implements OnInit {
    @Input() flow: Flow;
    @Input() activeStepId: number;
    @Output() setActiveStepId = new EventEmitter<number>();
    @Output() deleteClicked = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    onClickClose() {
        this.setActiveStepId.emit(-1);
    }

    onClickDelete() {
        this.deleteClicked.emit();
    }
}
