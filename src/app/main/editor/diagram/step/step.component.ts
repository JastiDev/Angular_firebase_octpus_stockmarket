import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Step } from "app/classes/Step";

@Component({
    selector: "diagram-step",
    templateUrl: "./step.component.html",
    styleUrls: ["./step.component.scss"],
})
export class StepComponent implements OnInit {
    @Input() step: Step;
    @Input() stepId: number;
    @Input() active: boolean;
    @Output() stepClicked = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    onClickStep() {
        this.stepClicked.emit();
    }

    onDragStart(event: DragEvent) {
        let target: HTMLElement = <HTMLElement>event.target;

        let icon: Element = target.querySelector(".icon-circle");

        event.dataTransfer.setDragImage(icon, 0, 0);
        event.dataTransfer.setData("dataType", "stepId");
        event.dataTransfer.setData("dataValue", JSON.stringify(this.stepId));
    }
}
