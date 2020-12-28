import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Flow } from "app/classes/Flow";
import { StepTemplate } from "app/classes/Step";

@Component({
    selector: "diagram-plus",
    templateUrl: "./plus.component.html",
    styleUrls: ["./plus.component.scss"],
})
export class PlusComponent implements OnInit {
    @Input() isLast: boolean;
    @Input() stepId: number;
    @Input() flow: Flow;

    active: boolean = false;
    constructor() {}
    ngOnInit(): void {}

    onDragEnter(event) {
        let element: HTMLElement = event.target;
        if (element.id === "droptarget") {
            this.active = true;
        }
    }

    onDragLeave(event) {
        let element: HTMLElement = event.target;
        if (element.id === "droptarget") {
            this.active = false;
        }
    }

    allowDrop(event: DragEvent) {
        event.preventDefault();
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.active = false;

        let dataType = event.dataTransfer.getData("dataType");
        if (dataType === "template") {
            let template = JSON.parse(event.dataTransfer.getData("dataValue"));
            this.addByTemplate(template);
        } else if (dataType === "stepId") {
            let stepId = JSON.parse(event.dataTransfer.getData("dataValue"));

            this.flow.moveStep(stepId, this.stepId);
        }
    }

    addByTemplate(template: StepTemplate) {
        this.flow.addStep(template, this.stepId);
    }
}
