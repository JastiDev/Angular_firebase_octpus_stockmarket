import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { stepTemplates, StepTemplate } from "app/classes/Step";

@Component({
    selector: "dash-select-step",
    templateUrl: "./select-step.component.html",
    styleUrls: ["./select-step.component.scss"],
})
export class SelectStepComponent implements OnInit {
    @Input() step: StepTemplate;
    @Output() stepChanged = new EventEmitter<StepTemplate>();

    stepTemplates = stepTemplates;
    constructor() {}

    ngOnInit(): void {}

    onChange(event) {
        let step: StepTemplate = event.value;
        this.stepChanged.emit(step);
    }
}
