import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { STEP_TEMPLATES } from '../../../../shared/data/templates';
import { IFlowStep } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'dash-select-step',
    templateUrl: './select-step.component.html',
    styleUrls: ['./select-step.component.scss'],
})
export class SelectStepComponent implements OnInit {
    @Input() step: IFlowStep;
    @Output() stepChanged = new EventEmitter<IFlowStep>();

    stepTemplates = STEP_TEMPLATES;
    constructor() {}

    ngOnInit(): void {}

    onChange(event): void {
        const step: IFlowStep = event.value;
        this.stepChanged.emit(step);
    }
}
