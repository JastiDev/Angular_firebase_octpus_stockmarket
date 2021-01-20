import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlowService } from 'app/services/flow.service';
import { IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'diagram-step-group',
    templateUrl: './step-group.component.html',
    styleUrls: ['./step-group.component.scss'],
})
export class StepGroupComponent implements OnInit {
    @Input() step: IFlowStep;

    dragCounter = 0;

    constructor(public flowService: FlowService) {}

    ngOnInit(): void {}

    onClickStep(step: IFlowStep): void {
        this.flowService.activeStep = step;
    }

    onDragEnter(event: any): void {
        this.dragCounter++;
    }

    onDragLeave(event: any): void {
        this.dragCounter--;
    }

    onDropChild(event): void {
        event.preventDefault();
        this.dragCounter--;
        const dataType = event.dataTransfer.getData('dataType');
        if (dataType === 'template') {
            const type: IFlowStepType = JSON.parse(event.dataTransfer.getData('dataValue'));

            if (type === 'signal') {
                this.flowService.addChild(type, this.step._id);
            }
        } else if (dataType === 'step') {
            const step = JSON.parse(event.dataTransfer.getData('dataValue'));
            // this.flow.moveStep(stepId, this.stepId);
        }
    }

    hasActive(step: IFlowStep, activeStep: IFlowStep): boolean {
        return activeStep && (step._id === activeStep._id || step.children.findIndex((x) => x._id === activeStep._id) > -1);
    }
}
