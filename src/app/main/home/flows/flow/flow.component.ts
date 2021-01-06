import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Flow } from "app/classes/Flow";

@Component({
    selector: "flows-flow",
    templateUrl: "./flow.component.html",
    styleUrls: ["./flow.component.scss"],
})
export class FlowComponent implements OnInit {
    @Input() flow: Flow;
    @Output() toggleChanged = new EventEmitter<boolean>();
    @Output() editClicked = new EventEmitter<any>();
    @Output() renameClicked = new EventEmitter<any>();
    @Output() cloneClicked = new EventEmitter<any>();
    @Output() deleteClicked = new EventEmitter<any>();
    @Output() detailsClicked = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    onClickFlow() {
        this.editClicked.emit();
    }

    stopPropagation(event: MouseEvent) {
        event.stopImmediatePropagation();
    }

    onClickDelete(event, span: HTMLElement) {
        if (span.innerText === "Trash") {
            span.innerText = "Really move to trash?";
            event.preventDefault();
            event.stopPropagation();
        } else this.deleteClicked.emit();
    }

    onClickInfo() {
        this.detailsClicked.emit();
    }
}
