import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as fafa from "@fortawesome/free-solid-svg-icons";
import { Flow } from "app/classes/Flow";

import { StepTemplate } from "app/classes/Step";

@Component({
    selector: "editor-diagram",
    templateUrl: "./diagram.component.html",
    styleUrls: ["./diagram.component.scss"],
})
export class DiagramComponent implements OnInit {
    @Input() flow: Flow;
    @Input() activeStepId: number;
    @Output() setActiveStepId = new EventEmitter<number>();
    fafa = fafa;

    constructor() {}
    ngOnInit(): void {}

    handleClickStep(id: number) {
        if (this.activeStepId === id) this.setActiveStepId.next(-1);
        else this.setActiveStepId.next(id);
    }
}
