import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as fafa from "@fortawesome/free-solid-svg-icons";
import { StepTemplate, stepTemplates } from "app/classes/Step";

@Component({
    selector: "editor-steps-panel",
    templateUrl: "./steps-panel.component.html",
    styleUrls: ["./steps-panel.component.scss"],
})
export class StepsPanelComponent implements OnInit {
    @Input() isMenu: boolean;
    @Output() templateClicked = new EventEmitter<StepTemplate>();

    fafa = fafa;
    stepTemplates = stepTemplates;

    constructor() {}
    ngOnInit(): void {}

    onClickStep(stepTemplate: StepTemplate) {
        if (this.isMenu) this.templateClicked.emit(stepTemplate);
    }

    onDragStart(event: DragEvent, stepTemplate: StepTemplate) {
        let target: HTMLElement = <HTMLElement>event.target;

        let icon: Element = target.querySelector(".icon-circle");

        if (this.isMenu == false) {
            event.dataTransfer.setDragImage(icon, 0, 0);
            event.dataTransfer.setData("dataType", "template");
            event.dataTransfer.setData(
                "dataValue",
                JSON.stringify(stepTemplate)
            );
        }
    }
}
